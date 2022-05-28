import data from '../commands/jmdb/db';
import sqlite3 from 'sqlite3';
import * as sqlite from 'sqlite';
import { open } from 'sqlite';
import SQL from 'sql-template-strings';
import { Schema } from '../trivia/Schema';
import { Relationship } from '../trivia/Relationship';
import { QuestionGenerator } from '../trivia/QuestionGenerator';
import { Store } from '../trivia/Store';

sqlite3.verbose();



let store = new Store();

store.root = data;
store.current = data;

//console.log( JSON.stringify( store.root, null, 3    ) );

export function loadDb(): Promise<sqlite.Database> {
   return open( {
      driver: sqlite3.Database,
      filename: '/tmp/millionaire.db',
   } ).then( async db => {
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
      return db;
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
}