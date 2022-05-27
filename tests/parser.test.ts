import { Lexer } from '../src/Lexer';
import { NormalArg, Parser } from '../src/Parser';

function createParser( text: string ): Parser {
   const lexer = new Lexer( text );
   return new Parser( lexer );
}

// Valid lines
// =========================================================================

test( 'parse command name only', () => {
   const parser = createParser( 'hello' );
   const line = parser.readRequest();
   expect( line ).not.toBeNull();
} );

test( 'parse command with one option', () => {
   const parser = createParser( 'hello --option' );
   const request = parser.readRequest();
   expect( request ).not.toBeNull();
   expect( request!.pipe.commands.length ).toStrictEqual( 1 );
   expect( request!.pipe.commands );
   expect( request!.pipe.commands[ 0 ].options.size ).toStrictEqual( 1 );
   expect( request!.pipe.commands[ 0 ].options.get( 'option' ) ).toStrictEqual(
      [] );
} );

test( 'parse command with one option and value', () => {
   const parser = createParser( 'hello --option=abc' );
   const request = parser.readRequest();
   expect( request ).not.toBeNull();
   expect( request!.pipe.commands.length ).toStrictEqual( 1 );
   expect( request!.pipe.commands );
   expect( request!.pipe.commands[ 0 ].options.size ).toStrictEqual( 1 );
   expect( request!.pipe.commands[ 0 ].options.get( 'option' ) ).toStrictEqual(
      [ new NormalArg( 'abc' ) ] );
} );

test( 'duplicate options', () => {
   const parser = createParser( 'hello --option=abc --option=123' );
   const request = parser.readRequest();
   expect( request ).not.toBeNull();
   expect( request!.pipe.commands.length ).toStrictEqual( 1 );
   expect( request!.pipe.commands );
   expect( request!.pipe.commands[ 0 ].options.size ).toStrictEqual( 1 );
   expect( request!.pipe.commands[ 0 ].options.get( 'option' ) )
      .toStrictEqual( [
         new NormalArg( 'abc' ),
         new NormalArg( '123' ),
      ],
   );
} );


test( 'end-of-options marker', () => {
   const parser = createParser( 'hello --option=abc -- --abc --' );
   const request = parser.readRequest();
   expect( request ).not.toBeNull();
   expect( request!.pipe.commands.length ).toStrictEqual( 1 );
   expect( request!.pipe.commands[ 0 ].options.size ).toStrictEqual( 1 );
   expect( request!.pipe.commands[ 0 ].options.get( 'option' ) )
      .toStrictEqual( [
         new NormalArg( 'abc' ),
      ],
   );
   expect( request!.pipe.commands[ 0 ].args ).toStrictEqual(
      [ new NormalArg( '--abc' ), new NormalArg( '--' ) ]
   );
} );

test( 'string argument', () => {
   const parser = createParser( 'hello "abc 123" "\\"" ""' );
   const request = parser.readRequest();
   expect( request ).not.toBeNull();
   expect( request!.pipe.commands.length ).toStrictEqual( 1 );
   console.log( request?.pipe.commands[ 0 ]);
   expect( request!.pipe.commands[ 0 ].args )
      .toStrictEqual( [
         new NormalArg( 'abc 123' ),
         new NormalArg( '"' ),
         new NormalArg( '' ),
      ]
   );
} );

test( 'parse input line with mention', () => {
   const lexer = new Lexer( '<@12345> `hello`' );
   const parser = new Parser( lexer );
   const line = parser.readRequest();
   expect( line ).not.toBe( null );
   expect( line!.recipient ).toStrictEqual( '12345' );
} );

test( 'parse input line with prefixed mention', () => {
   const lexer = new Lexer( '`hello` `!` <@12345>' );
   const parser = new Parser( lexer );
   const line = parser.readRequest();
   expect( line ).not.toBe( null );
   expect( line!.recipient ).toStrictEqual( '12345' );
} );

test( 'parse input line with non-prefixed mention', () => {
   const lexer = new Lexer( '`hello` <@12345>' );
   const parser = new Parser( lexer );
   const line = parser.readRequest();
   console.log( line );
   expect( line ).not.toBe( null );
   expect( line!.recipient ).toBeNull();
} );

test( 'parse input line with initial mention and prefixed mention', () => {
   const lexer = new Lexer( '<@12345> `hello` `!`<@54321>' );
   const parser = new Parser( lexer );
   const line = parser.readRequest();
   expect( line ).not.toBe( null );
   expect( line!.recipient ).toStrictEqual( '54321' );
   console.log( line );
} );

// Errors
// =========================================================================