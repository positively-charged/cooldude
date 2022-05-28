import { Request, Response } from '../src/command';
import { ArgReader, CommandRegistry } from '../src/CommandRegistry';
import { Executor, CommandHandler } from '../src/Executor';
import { Lexer } from '../src/Lexer';
import { Line, NormalArg, Parser } from '../src/Parser';
import { User } from '../src/User';

function executeCommand( command: string ): string {
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