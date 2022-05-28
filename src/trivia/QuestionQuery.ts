import { Arg } from "./Arg";
import { ArgBuilder } from "./ArgBuilder";
import { Reply } from "./Reply";
import * as sqlite from 'sqlite';

export class QuestionQuery {
   args: Arg[];
   subs: string[];
   answerCol: string;

   constructor( private query: string ) {
      this.args = [];
      this.subs = [];
      this.answerCol = '';
   }

   arg( builder: ( s: ArgBuilder ) => void ): QuestionQuery {
      const arg = new Arg();
      this.args.push( arg );
      builder( new ArgBuilder( arg ) );
      return this;
   }

   sub( name: string ): QuestionQuery {
      this.subs.push( name );
      return this;
   }

   answer( answer: string ): QuestionQuery {
      this.answerCol = answer;
      return this;
   }

   async run( db: sqlite.Database, reply: Reply ) {
      let args: string[] = [];
      for ( const arg of this.args ) {
         if ( arg.random ) {
            const value = await this.getRandomEntity( db, arg.entity );
            args.push( value );
            if ( arg.sub !== null ) {
               if ( arg.sub !== '' ) {
                  reply.sub( arg.sub, value );
               } else {
                  reply.sub( arg.entity, value );
               }
            }
         }
      }

      const stmt = await db.prepare( this.query, args );
      const row = await stmt.get();
      await stmt.finalize();
console.log( args );
      for ( const sub of this.subs ) {
         if ( sub in row ) {
            reply.sub( sub, row[ sub ] );  
         }
      }

      console.log( row);

      reply.answer = row[ this.answerCol ];
   }

   private async getRandomEntity( db: sqlite.Database,
      entity: string ): Promise<string> {
      // SQLite doesn't escape table names for whatever reason, so we gotta do
      // it ourselves.
      const name = entity.replace( '"', '\\"' ); 
      const stmt = await db.prepare( `
         select id from "${name}" where rowid = abs( random() %
            ( select max( rowid ) from "${name}" ) ) + 1` );
      const row = await stmt.get<{ id: string }>();
      stmt.finalize();
      if ( row !== undefined ) {
         return row.id;
      }
      return '';
   }
}