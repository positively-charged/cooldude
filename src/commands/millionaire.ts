import data from './jmdb/db';

class Store {
   root: any;
   current: any;
   parents: any[];
   temporary: any;

   constructor( root: any = {} ) {
      this.root = root;
      this.parents = [];
      this.current = this.root;
      this.temporary = null;
   }

   enter( path: string, temporarily = false ): Store {
      let node = this.current;
         if ( path !== '' ) {
         const components = path.split( '.' );
         for ( let component of components ) {
            if ( ! ( node instanceof Object ) ) {
               throw new Error( `${path} is a value` );
            }

            component = component.trim();
            if ( component === '*' ) {
               const keys = Object.keys( node );
               if ( keys.length === 0 ) {
                  throw new Error( 'empty path component' );
               }
               component = keys[ 0 ];
            }

            if ( ! ( component in node ) ) {
               node[ component ] = {};
            }

            if ( ! temporarily ) {
               this.parents.push( node );
            }

            node = node[ component ];
         }
      }
      if ( temporarily ) {
         this.temporary = node;
      }
      else {
         this.current = node;
      }
      return this;
   }

   carve( path: string, value: string ): Store {
      const components = path.split( '.' );
      let last = components.pop();
      this.enter( components.join( '.' ), true );
      if ( last !== undefined ) {
         this.temporary[ last ] = value;
      }
      return this;
   }

   set( property: string, value: string ): Store {
      this.carve( property, value );
      return this;
   }

   leave(): Store {
      this.current = this.parents.pop();
      return this;
   }

   reset() {
      this.current = this.root;
      this.parents = [];
      this.temporary = null;
   }
}

let store = new Store();

store.root = data;
store.current = data;

console.log( JSON.stringify( store.root, null, 3    ) );

enum Relationship {
   OneToOne,
   OneToMany,
   ManyToMany,
}

class TableDefinition {
   private name: string;
   private fields: string[];
   
   constructor( name: string ) {
      this.name = name;
      this.fields = [];
   }

   async create( db: sqlite.Database ): Promise<Table> {
      const query = this.createQuery();
      await db.exec( query );
      return new Table( db, this.name, this.fields );
   }

   addField( name: string ) {
      this.fields.push( name );
   }

   private createQuery(): string {
      let query = ``;
      query += `drop table if exists ${this.name};\n`;
      query += `create table ${this.name} (\n`;
      query += `   id text`;
      for ( const name of this.fields ) {
         query += `,\n   ${name} text`;
      }
      query += '\n)';
      return query;
   }
}

type Query = 'insert';

class Table {
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

class Schema {
   private store: Store;
   private db: sqlite.Database;

   constructor( store: Store, db: sqlite.Database ) {
      this.store = store;
      this.db = db;
   }

   async entity( name: string, path: string ) {
      this.store.reset();
      this.store.enter( path );

      const entries = Object.entries( this.store.current );
      const firstEntry = entries.at( 0 );
      if ( firstEntry === undefined || ! ( firstEntry[ 1 ] instanceof Object ) ) {
         throw new Error( 'empty entity' );
      }

      // Create table for entity.
      const tableDef = new TableDefinition( name );
      for ( const [ name ] of Object.entries( firstEntry[ 1 ] ) ) {
         tableDef.addField( name );
      }

      //const table = tableBuilder.create( db );
      //table.insert( 

      const table = await tableDef.create( this.db );
      console.log( entries );

      // Populate table with entity records.
      for ( const [ id, record ] of entries ) {
         await table.insert( id, record as Object );
      }
   }

   relate( entity1: string, entity2: string, relationship: Relationship ) {}
}

import sqlite3 from 'sqlite3';
import * as sqlite from 'sqlite';
import { open } from 'sqlite';
import SQL from 'sql-template-strings';

sqlite3.verbose();


async function createJmDb(): Promise<sqlite.Database> {
   const db = await open( {
      driver: sqlite3.Database,
      filename: '/tmp/millionaire.db',
   } );
   /*
   await db.exec( `create table map(
      lump text
   )` ); 
   await db.exec( 'insert into map values( \'MAP01\' )' );
   await db.exec( 'insert into map values( \'MAP02\' )' );
   await db.exec( 'insert into map values( \'MAP03\' )' );
   const stmt = await db.prepare( `select rowid, * from map
      where lower( lump ) = lower( :lump )`, { ':lump': 'map01' } );
   const r = await stmt.all();
   const map = 'map03';
   
   console.log( r );

   await stmt.finalize();
*/
   return db;
}

type QuestionHandler = ( db: sqlite.Database ) => Promise<void>;

class Reply {
   private subs: { [ k: string ]: string };

   constructor(
      public stem: string,
      public answer: string = '',
   ) {
      this.subs = {};
   }

   sub( name: string, value: string ) {
      this.subs[ name ] = value;
   }

   present() {
      let stem = this.stem;
      for ( const [ name, value ] of Object.entries( this.subs ) ) {
         stem = stem.replace( `{${name}}`, value );
      }
      console.log( 'question: %s', stem );
      console.log( 'answer: %s', this.answer );
   }
}

class Question {
   constructor(
      public stems: string[] = [],
      public params: any = {},
      public answer: string = '',
      public handler: ( ( reply: Reply ) => Promise<void> )| null = null,
   ) {}

   stem( stem: string ): Question {
      this.stems.push( stem );
      return this;
   }

   handle( handler: ( reply: Reply ) => Promise<void> ): Question {
      this.handler = handler;
      return this;
   }

   async process() {
      const index = Math.floor( Math.random() *
         this.stems.length );
      const stem = this.stems[ index ];
      if ( this.handler !== null ) {
         const reply = new Reply( stem );
         await this.handler( reply );
         reply.present();
      }
   }
}

class Arg {
   constructor(
      public entity = '',
      public random = false,
      public sub: string|null = null,
   ) {}
}

class ArgBuilder {
   constructor(
      private arg: Arg,
   ) {}

   random( entity: string ): ArgBuilder {
      this.arg.entity = entity;
      this.arg.random = true;
      return this;
   }

   sub( param: string = '' ): ArgBuilder {
      this.arg.sub = param;
      return this;
   }
}

class QuestionQuery {
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

class QuestionGenerator {
   constructor( private db: sqlite.Database ) {}

   async generateQuestion() {
      //const map = await this.getRandomEntity( 'map' );
      //console.log( map );

      await new Question()
         .stem( 'Who made {map} ({lump})?' )
         .stem( '{map} ({lump}) was developed by who?' )
         .stem( 'Who is the author of {map} ({lump})?' )
         .handle( async ( reply ) => {
            //q.map = 'abc';
            await this.query( `
               select author.name as author, map.name as map, map.lump 
                  from author
                  join author_map on author_map.author = author.id
                  join map on map.id = author_map.map
                  where map.id = ?` )
               .arg( arg => arg.random( 'map' ) )
               .sub( 'map' )
               .sub( 'lump' )
               .answer( 'author' )
               .run( this.db, reply );
         } ).process();

/*
      new Question( 'Who made {map}?', { map: 'map01', type: 'value' }, 'Cyber' );
      new Question( 'Who made {map}?', { map: 'projects.*.maps.*.name', type: 'value' }, 'Cyber' );
      new Question( 'Who many maps are in {project}?',
         { project: 'projects.{project}.maps', type: 'count' }, 'Cyber' );
         */
   }

   private query( query: string ): QuestionQuery {
      return new QuestionQuery( query );
   }
}

( async () => {
   console.log( 'abc' );
   const db = await createJmDb();

   // Map the data store to a relational model.
   const schema = new Schema( store, db );
   await schema.entity( 'project', 'project' );
   await schema.entity( 'map', 'map' );
   await schema.entity( 'map_music', 'map_music' );
   await schema.entity( 'episode', 'episode' );
   await schema.entity( 'project_map', 'project_map' );
   await schema.entity( 'author', 'author' );
   await schema.entity( 'map_author', 'map_author' );
   await schema.entity( 'music', 'music' );
   await schema.entity( 'difficulty', 'difficulty' );
   await schema.entity( 'release', 'release' );
   schema.relate( 'project', 'map', Relationship.OneToMany );

   const questions = new QuestionGenerator( db );
   await questions.generateQuestion();

   await db.close();
   console.log( 'abc' );
} )();