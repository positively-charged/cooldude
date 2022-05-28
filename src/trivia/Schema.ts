import * as sqlite from 'sqlite';
import { Relationship } from './Relationship';
import { Store } from './Store';
import { TableDefinition } from './TableDefinition';

export class Schema {
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
      // console.log( entries );

      // Populate table with entity records.
      for ( const [ id, record ] of entries ) {
         await table.insert( id, record as Object );
      }
   }

   relate( entity1: string, entity2: string, relationship: Relationship ) {}
}