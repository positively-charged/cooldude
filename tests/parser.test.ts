import { Lexer } from '../src/Lexer';
import { Parser } from '../src/Parser';

test( 'parse valid input line', () => {
   const lexer = new Lexer( '`hello`' );
   const parser = new Parser( lexer );
   const line = parser.readRequest();
   expect( line ).not.toBeNull();
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