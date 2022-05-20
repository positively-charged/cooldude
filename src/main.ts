import process from 'process';
import fs from 'fs/promises';
import parseArgs from 'minimist';
import { runBot } from "./bot";

class Options {
   constructor(
      public token: string = '',
   ) {}
}

// Entry point.
( async() => {
   const options = readOptions();
   const token = await readToken( options );
   runBot( token );
} )();

function readOptions(): Options {
   // Get the program arguments, skipping the path arguments for the node
   // binary and the script.
   let args = parseArgs( process.argv.slice( 2 ) );

   if ( ! ( 'token' in args ) ) {
      console.log( 'error: missing --token option' );
      process.exit( 1 );
   }
   
   return new Options( args[ 'token' ] );
}

async function readToken( options: Options ): Promise<string> {
   return fs.open( options.token, 'r' ).then( async handle => {
      const content = await handle.readFile( 'utf8' );
      await handle.close();
      return content.trim();
   } ).catch( reason => {
      console.log( 'error: failed to open token file (%s)', reason );
      process.exit( 1 );
   } );
}