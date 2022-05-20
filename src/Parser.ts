import { Lexer, Token, TokenType as Tk } from "./Lexer";

class SyntaxError {}

export class Option {
   name: string = '';
   value: string|null = null;
}

export class Command {
   name: string = '';
   recipient: string|null = null;
   options: Map<string, Option|Option[]> = new Map();
   args: ( NormalArg|BracedArg|MentionArg )[] = [];
   allArgs: ( ActionArg|NormalArg|BracedArg )[] = [];
}

export class ActionArg {
   name: string = '';
}

export class NormalArg {
   text: string = '';
}

export class BracedArg {
   pipe: Pipe|null = null;
}

export class MentionArg {
   constructor(
      public id: string,
   ) {}
}

export class Pipe {
   commands: Command[] = [];
}

export class Line {
   constructor(
      public pipe: Pipe,
      public recipient: string|null = null,
   ) {}
}

type ArgList = ( ActionArg|NormalArg|BracedArg|MentionArg )[];

/**
 * Parses a chat line.
 */
export class Parser {
   private token: Token;
   private prevToken: Token|null;
   private recipient: string|null;
   private commandsParsed: number;

   constructor( private lexer: Lexer ) {
      this.token = lexer.read();
      this.prevToken = null;
      this.recipient = null;
      this.commandsParsed = 0;
   }

   readRequest(): Line|null {
      try {
         const pipe = this.readPipe();
         const line = new Line( pipe, this.recipient );
/*
         let args = pipe.commands[ 0 ].allArgs;
         while ( args.length > 0 ) {
            const arg = args.shift();
            if ( arg instanceof ActionArg && arg.name === '!' &&
               args.length > 0 && args[ 0 ] instanceof BracedArg &&
               args[ 0 ].mention !== null ) {
               line.recipient = args[ 0 ].mention;
               args.shift();
            }
         }

         if ( line.recipient === null ) {
            if ( pipe.commands[ 0 ].args[ 0 ] instanceof BracedArg &&
               pipe.commands[ 0 ].args[ 0 ].mention !== null ) {
               line.recipient = pipe.commands[ 0 ].args[ 0 ].mention;
               //pipe.commands[ 0 ].args.shift();
            }
         }
         */

         for ( const command of pipe.commands ) {
            if ( command.recipient !== null ) {
               line.recipient = command.recipient;
            }
         }

         if ( line.recipient === null ) {
            if ( pipe.commands[ 0 ].args[ 0 ] instanceof MentionArg ) {
               line.recipient = pipe.commands[ 0 ].args[ 0 ].id;
               pipe.commands[ 0 ].args.shift();
            }
         }

         return line;
      } catch ( err: unknown ) {
         if ( err instanceof SyntaxError ) {
            console.log( 'bad command syntax' );
         } else {
            // Don't print the generic error to the user. It might contain some
            // sensitive information. We don't know.
            console.log( 'an error occured' );
         }
         return null;
      }
   }

   private readPipe(): Pipe {
      const pipe = new Pipe();
      while ( true ) {
         this.parseCommand( pipe );
         if ( this.token.type === Tk.BAR ) {
            this.readTk();
         } else {
            return pipe;
         }
      }
   }

   private parseCommand( pipe: Pipe ) {
      const args = this.readArgList();
      console.log( args );
      const command = new Command();

      while ( args.length > 0 ) {
         const arg = args.shift();
         if ( arg === undefined ) {
            break;
         }

         if ( arg instanceof ActionArg ) {
            if ( arg.name === '!' && args.length > 0 &&
               args[ 0 ] instanceof MentionArg &&
               pipe.commands.length === 0 ) {
               command.recipient = args[ 0 ].id;
               args.shift();

            }
            else {
               command.name = arg.name;
            }
         }
         else {
            command.args.push( arg );
         }
      }
      console.log( command );

      pipe.commands.push( command );
   }

   private readArgList(): ArgList {
      const args: ArgList = [];
      while ( true ) {
         if ( this.token.type === Tk.TICK ) {
            this.readCommandItem( args )
         } else if ( this.token.type === Tk.LBRACE
            || this.token.type === Tk.MENTION
            || this.token.type === Tk.ID
            || this.token.type === Tk.NORMAL_ARG  ) {
            this.readArg( args );
         } else {
            ++this.commandsParsed;
            return args;
         }
      }
   }

   private readCommandItem( args: ArgList ) {
      this.testTk( Tk.TICK )
      this.readTk()
      if ( this.token.type == Tk.BANG ) {
         let arg = new ActionArg();
         arg.name = '!';
         args.push( arg );
         this.readTk();
      } else {
         this.testTk( Tk.ID );
         //command.name = this.token.text;
         let arg = new ActionArg();
         arg.name = this.token.text;
         args.push( arg );
         this.readTk();
         this.readOptionList( args );
      }
      this.testTk( Tk.TICK );
      this.readTk();
   }

   private readOptionList( args: ArgList ) {
      while ( this.token.type === Tk.ID ) {
         const option = new Option();
         option.name = this.token.text;
         this.readTk();
         // @ts-ignore: compiler is not smart enough to see that we modified
         // the token in the readTk() method.
         if ( this.token.type === Tk.EQ ) {
            this.readTk();
            if ( this.token.type !== Tk.STRING ) {
               this.testTk( Tk.NORMAL_ARG )
            }
            option.value = this.token.text;
            this.readTk();
         }
         /*
         if ( option.name in command.options ) {
            let o = command.options.get( option.name );
            if ( o instanceof Array ) {
               o.push( option );
            } else {
               o = [ option ];
               command.options.set( option.name, o );
            }
         } else {
            command.options.set( option.name, option );
         }*/
      }
   }

   private readArg( args: ArgList ) {
      if ( this.token.type == Tk.LBRACE ) {
         this.readTk();
         const arg = new BracedArg();
         arg.pipe = this.readPipe();
         args.push( arg );
         this.testTk( Tk.RBRACE )
         this.readTk();
      } else if ( this.token.type === Tk.MENTION ) {
         this.readMention( args );
      } else {
         if ( this.token.type !== Tk.ID ) {
            this.testTk( Tk.NORMAL_ARG );
         }
         const arg = new NormalArg();
         arg.text = this.token.text;
         args.push( arg );
         this.readTk();
      }
   }

   private readMention( args: ArgList ) {
      this.testTk( Tk.MENTION );
      const arg = new MentionArg( this.token.text );
      args.push( arg );
      this.readTk();

      /*
      if ( this.commandsParsed === 0 && (
            command.name === '' &&
            command.args.length === 1
         ) ) {
         this.recipient = arg.mention;
      }*/
   }

   private readTk() {
      this.prevToken = this.token;
      this.token = this.lexer.read();
   }

   private testTk( expectedTk: Tk ) {
      this.lexer.test( expectedTk ); 
   }
}