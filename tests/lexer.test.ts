import { Lexer, TokenType } from '../src/Lexer';

test( 'all valid tokens', () => {
   const lexer = new Lexer( '|=hello"abc"{}<@12345> !@# --abc --' );
   expectTk( lexer, TokenType.BAR );
   expectTk( lexer, TokenType.EQ );
   expectTk( lexer, TokenType.ID );
   expectTk( lexer, TokenType.STRING );
   expectTk( lexer, TokenType.LBRACE );
   expectTk( lexer, TokenType.RBRACE );
   expectTk( lexer, TokenType.MENTION );
   expectTk( lexer, TokenType.NORMAL_ARG );
   expectTk( lexer, TokenType.OPTION_NAME );
   expectTk( lexer, TokenType.OPTION_END );
   expectTk( lexer, TokenType.END );
} );

function expectTk( lexer: Lexer, tk: TokenType ): void {
   expect( () => lexer.read() ).not.toThrow();
   expect( () => lexer.test( tk ) ).not.toThrow();
}

test( 'string tokens', () => {
   let lexer = new Lexer( '"\\\\\\""' );
   expectTk( lexer, TokenType.STRING );
   expect( lexer.token.text ).toStrictEqual( '\\"' );
   lexer = new Lexer( '"\\\\"' );
   expectTk( lexer, TokenType.STRING );
   expect( lexer.token.text ).toStrictEqual( '\\' );
   lexer = new Lexer( '"\\\\\\""' );
   expectTk( lexer, TokenType.STRING );
   expect( lexer.token.text ).toStrictEqual( '\\"' );
} );