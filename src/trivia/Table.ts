import * as sqlite from 'sqlite';

type Query = 'insert';
type QuestionHandler = ( db: sqlite.Database ) => Promise<void>;

export class Table {
   private name: string;
   private fields: string[];
   private queries: Map<Query, string>;
   private params: Map<Query, string[]>;
   
   constructor( private db: sqlite.Database, name: string, fields: string[] ) {
      this.name = name;
      this.fields = fields;
      this.queries = new Map();
      this.params = new Map();
   }

   async insert( id: string, args: Object ) {
      let query = this.createInsertQuery( args );
      let stmt = await this.db.prepare( query );
      args = [ id, ... Object.values( args ) ];
      console.log( query, args );
      await stmt.run( args );
      await stmt.finalize();
   }

   private createInsertQuery( args: Object ): string {
      let query = ``;
      const fields = this.createInsertFields( args, );
      const params = this.createInsertFields( args, true );
      query += `insert into ${this.name}( id${fields} ) `;
      query += `values ( ?${params} )`;
      return query;
   }

   private createInsertFields( args: Object,
      prefixWithColon = false ): string {
      let fields = '';
      for ( const field of Object.keys( args ) ) {
         if ( prefixWithColon ) {
            fields += `, ?`;
         } else {
            fields += `, ${field}`;
         }
      }
      return fields;
   }
}