import { Request, Response } from '../src/execution/command';
import { CommandHandler } from '../src/execution/CommandHandler';
import { ArgReader, CommandRegistry } from '../src/execution/CommandRegistry';
import { Executor } from '../src/execution/Executor';
import { Lexer } from '../src/Lexer';
import { Line, NormalArg, Parser } from '../src/Parser';
import { User } from '../src/User';

async function executeCommand( command: string ): Promise<string> {
   const lexer = new Lexer( command );
   const parser = new Parser( lexer );
   
   const line = parser.readRequest()!;

   if ( line !== null ) {
      const registry = new CommandRegistry();
      const executor = new Executor( registry, new User(), line.pipe );

      return executor.execute();
   } else {
      return '';
   }
}

// Valid lines
// =========================================================================

test( 'commands', () => {
   expect( executeCommand( '<@123> hello' ) ).toStrictEqual( 'Hello, World!' );
   expect( executeCommand( '<@123> echo 1 2 3' ) ).toStrictEqual( '1 2 3' );
   expect( executeCommand( '<@123> help' ) );
   expect( executeCommand( '<@123> hello' ) );
   expect( executeCommand( '<@123> pick 1 2 3' ) ).toMatch( /1|2|3/ );
   expect( executeCommand( '<@123> who-would-win a b c' ) );
   expect( executeCommand( '<@123> who-would-win a b' ) );
   console.log( executeCommand( '<@123> who-would-win a b' ) );
   console.log( executeCommand( '<@123> who-would-win a b c' ) );
   expect( executeCommand( '<@123> help who-would-win' ) );
} );

test( 'parse command name only', () => {
   //const line = new Executor( )
   //expect( line ).not.toBeNull();

   const registry = new CommandRegistry();
   const entry = registry.get( 'echo' );
   expect( entry ).not.toBeNull();

   const args = new ArgReader( entry! );
   const request = new Request( new User(), entry! );
   request.addArg( 'a' );
   request.addArg( 'b' );
   request.addArg( 'c' );

   const handler = new CommandHandler( registry );
   const requst = new Request( new User(), entry! );
   const response = new Response();
   handler.execute( 'echo', request, response );
   
   expect( response.result ).toStrictEqual( 'a b c' );

} );

test( 'map-info', async () => {
   expect( await executeCommand( '<@123> map-info map01' ) );
   expect( executeCommand( '<@123> map-info invalid-map' ) )
      .rejects.toThrow( Error );
} );

test( 'project-info', async () => {
   expect( await executeCommand( '<@123> project-info' ) );
   expect( await executeCommand( '<@123> project-info jm' ) );
} );