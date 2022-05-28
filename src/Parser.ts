import { Lexer, Token, TokenType as Tk, TokenType } from "./Lexer";

class SyntaxError {}

export class Option {
   name: string = '';
   value: string|null = null;
}

export class Command {
   name: string = '';
   recipient: string|null = null;
   options: Options = new Map();
   args: ArgList = [];
   allArgs: ( ActionArg|NormalArg|BracedArg )[] = [];
}

export class ActionArg {
   name: string = '';
}

export class NormalArg {
   constructor(
      public text: string = '',
   ) {}
}

export class BracedArg {
   pipe: Pipe|null = null;
}

export class MentionArg {
   constructor(
      public id: string,
   ) {}
}

type Value = ActionArg | NormalArg | BracedArg | MentionArg;

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

// The value part of an option is an array because multiple options with the
// same name can be specified. The values are then combined into an array.
type Options = Map<string, Value[]>;

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
         if ( this.token.type === Tk.MENTION ) {
            this.recipient = this.token.text;
            this.readTk();
         }
         else {
            return null;
         }
         const pipe = this.readPipe();
         const line = new Line( pipe, this.recipient );
         this.testTk( TokenType.END );
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
      this.testTk( TokenType.ID );
      const command = new Command();
      command.name = this.token.text;
      this.readTk();

      command.options = this.readOptionPart();
      command.args = this.readArgList();

      pipe.commands.push( command );
   }

   private readOptionPart(): Options {
      const options = new Map<string, Value[]>();

      while ( this.token.type === TokenType.OPTION_NAME ) {
         this.readOption( options );
      }

      if ( this.token.type === TokenType.OPTION_END ) {
         this.readTk();
      }

      /*
      while ( this.token.type === TokenType.OPTION_NAME ) {
         const option = this.readOption();
         const value = options.get( option.name );
         console.log( value );
         if ( option.name in options ) {
            const value = options.get( option.name );
            if ( value instanceof Array ) {
               value.push( option );
            } else {
               o = [ option ];
               command.options.set( option.name, o );
            }
         } else {
            command.options.set( option.name, option );
         }
      }
      */


      return options;
   }

   private readOption( options: Options ): void {
      this.testTk( TokenType.OPTION_NAME );
      const name = this.token.text;
      this.readTk();

      const value = options.get( name );
      if ( value === undefined ) {
         options.set( name, [] );
      }

      // @ts-ignore: compiler is not smart enough to see that we modified
      // the token in the readTk() method.
      if ( this.token.type === Tk.EQ ) {
         this.readTk();
         const value = this.readArg();
         options.get( name )?.push( value );
      }
   }

   private readArgList(): ArgList {
      const args: ArgList = [];
      while ( true ) {
         if ( this.token.type === Tk.LBRACE
            || this.token.type === Tk.MENTION
            || this.token.type === Tk.ID
            || this.token.type === Tk.OPTION_NAME
            || this.token.type === Tk.OPTION_END
            || this.token.type === Tk.STRING
            || this.token.type === Tk.NORMAL_ARG  ) {
            const arg = this.readArg();
            args.push( arg );
         } else {
            ++this.commandsParsed;
            return args;
         }
      }
   }

   private readCommandItem( args: ArgList ) {
   }

   private readOptionList() {
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

   private readArg(): any {
      if ( this.token.type == Tk.LBRACE ) {
         this.readTk();
         const arg = new BracedArg();
         arg.pipe = this.readPipe();
         this.testTk( Tk.RBRACE )
         this.readTk();
         return arg;
      } else if ( this.token.type === Tk.MENTION ) {
         return this.readMention();
      } else if ( 
         this.token.type === Tk.OPTION_NAME ||
         this.token.type === Tk.OPTION_END ) {
         const arg = new NormalArg();
         arg.text = '--' + this.token.text;
         this.readTk();
         return arg;
      } else {
         if ( this.token.type !== Tk.ID && this.token.type !== Tk.STRING ) {
            this.testTk( Tk.NORMAL_ARG );
         }
         const arg = new NormalArg();
         arg.text = this.token.text;
         this.readTk();
         return arg;
      }
   }

   private readMention() {
      this.testTk( Tk.MENTION );
      const arg = new MentionArg( this.token.text );
      this.readTk();
      return arg;

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