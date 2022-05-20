
export enum TokenType {
   END,
   BAR,
   TICK,
   BANG,
   EQ,
   ID,
   STRING,
   LBRACE,
   RBRACE,
   MENTION,
   NORMAL_ARG,
}

export interface Token {
   type: TokenType;
   text: string;
}

/**
 * Generates tokens for the parser.
 */
export class Lexer {
   token: Token;
   
   private pos: number;
   private endToken: Token;

   constructor( private readonly text: string ) {
      this.pos = 0;
      this.endToken = { type: TokenType.END, text: '' };
      this.token = this.endToken;
   }

   /**
    * Reads a new token. When no more tokens are available, this function
    * returns END token.
    */ 
   read(): Token {
      // Skip past any initial whitespace.
      while ( /\s/.test( this.text[ this.pos ] ) ) {
         ++this.pos;
      }

      if ( this.pos < this.text.length ) {
         if ( /[a-zA-Z0-9]/.test( this.text[ this.pos ] ) ) {
            this.readId();
         }
         else {
            switch ( this.text[ this.pos ] ) {
            case '"':
               ++this.pos;
               this.readString();
               break;
            case '<':
               this.readMention();
               break;
            case '!':
               this.result( TokenType.BANG )
               ++this.pos;
               break;
            case '|':
               this.result( TokenType.BAR )
               ++this.pos;
               break;
            case '`':
               this.result( TokenType.TICK )
               ++this.pos;
               break;
            case '=':
               this.result( TokenType.EQ )
               ++this.pos;
               break;
            case '{':
               this.result( TokenType.LBRACE )
               ++this.pos;
               break;
            case '}':
               this.result( TokenType.RBRACE )
               ++this.pos;
               break;
            default:
               this.readArgument();
               break;
            }
         }
      }
      else {
         this.result( TokenType.END );
      }

      return this.token;
   }


   private readId(): boolean {
      const start = this.pos;
      while ( this.pos < this.text.length && (
         this.text[ this.pos ].search( /[a-zA-Z0-9]/ ) !== -1 ||
         this.text[ this.pos ] === '-' ) ) {
         ++this.pos;
      }
      if ( this.pos - start > 0 ) {
         this.result( TokenType.ID, this.text.slice( start, this.pos ) );
         return true;
      } else {
         return false;
      }
   }

   private readString(): boolean {
      const start = this.pos;
      while ( this.pos < this.text.length && this.text[ this.pos ] !== '"' ) {
         ++this.pos;
      }
      if ( this.pos <= this.text.length ) {
         this.result( TokenType.STRING, this.text.slice( start, this.pos ) );
         ++this.pos;
         return true;
      }
      return false;
   }

   private readMention(): boolean {
      let pos = this.pos;
      if ( pos < this.text.length && this.text[ pos ] === '<'
         && pos + 1 < this.text.length && this.text[ pos + 1 ] === '@' ) {
         pos += 2;
         if ( pos < this.text.length && this.text[ pos ] === '!' ) {
            ++pos;
         }
         const id_start = pos;
         while ( /[0-9]/.test( this.text[ pos ] ) ) {
            ++pos;
         }
         if ( pos < this.text.length && this.text[ pos ] === '>' ) {
            this.result( TokenType.MENTION, this.text.slice( id_start, pos ) );
            this.pos = pos + 1;
            return true;
         }
      }
      return this.readArgument();
   }

   private readArgument(): boolean {
      const start = this.pos;
      while ( this.pos < this.text.length &&
         ! /\s/.test( this.text[ this.pos ] ) &&
         ! ( this.text[ this.pos ] in [ '{', '}', '`', '|' ] ) ) {
         ++this.pos;
      }
      if ( this.pos - start > 0 ) {
         this.result( TokenType.NORMAL_ARG,
            this.text.slice( start, this.pos ) );
         return true;
      }
      return false;
   }

   private result( type: TokenType, text: string = '' ) {
      this.token = { type, text };
   }

   test( expectedTk: TokenType ) {
      if ( this.token.type !== expectedTk ) {
         //console.log( this.token.type );
         //console.log( this.token.text );
         //console.log( expectedTk );
         console.log( 'error: unexpected token' );
         throw new SyntaxError();
      }
   }
}

/* interface A {
   a: number|null;
   b?: string|null;
   f( a: number ): boolean;
}

const a: A[] = [ { a: 123, b: 'a' }, { a: null, b: null } ];
const b: { [ a: number ]: Number } = { 1: 1 };
const c = new Map<number, string>();
c.set( 3, 2 );
c.set( 'a', 'a' );
const d: unknown = { a: 123 };
const e: any = { b: 321 };

function hasA( a: unknown ): a is { a: number } {
   return true;
}

const a3 = { a: Number };
if ( hasA( d ) ) {
   d.a = 1;
}
e.b;


const f: [ b: number, c: number ] = [ 1, 2 ];
const [ f1, f2 ]: [ a: number, b: number ] = f;

f[ 1 ];

class C implements A {
   constructor( readonly a: number|null ) {
      this.a = 123;
      this.a = 321;

   }



    f(  ): boolean {
      this.a = 1;
      return true;
   }
}

new C( 123 ).a;*/