import { BracedArg, Command, NormalArg, Pipe, Option, MentionArg } from "./Parser";
import { CommandRegistry, Request, Response } from "./command";
import { User } from "./User";

export class Executor {
   private registry: CommandRegistry;
   private user: User;
   private pipe: Pipe;
   private prevResult: any;

   constructor( registry: CommandRegistry, user: User, pipe: Pipe ) {
      this.registry = registry;
      this.user = user;
      this.pipe = pipe;
      this.prevResult = null;
   }

   execute(): string {
      'I\'m cool and you\'re not'
      'How about no'
      'Piss off, mate'
      for ( const command of this.pipe.commands ) {
         this.executeCommand( command );
      }
      const output = this.outputResult();
      console.log( output );
      return output;
   }

   private executeCommand( reading: Command ) {
      let pos = 0;

      let name = reading.name;
      if ( name === '' ) {
         if ( reading.args.length > 0 ) {
            const arg = reading.args[ pos ];
            if ( arg instanceof NormalArg ) {
               name = arg.text;
               ++pos;
            }
         }
         if ( name === '' ) {
            throw new Error( 'missing command name' );
         }
      }

      // Command names are case-insensitive.
      const normalizedName = name.toLowerCase();
      const command = this.registry.find( normalizedName );
      if ( command === null ) {
         throw new Error( `I don\'t understand what \`${name}\` means` );
      }

      let request = new Request( this.user );
      request.options = reading.options as any;
      for ( let param of command.params ) {
         const arg = this.executeArg( reading, pos, Function );
         request.args.set( param.name as any, arg );
         ++pos;
      }
      if ( command.restParam !== null ) {
         let rest: any[] = [];
         if ( reading.args.length > 0 ) {
            while ( pos < reading.args.length ) {
               const arg = this.executeArg( reading, pos, Function );
               rest.push( arg );
               ++pos;
            }
         } else {
            if ( this.prevResult !== null ) {
               rest = [ this.prevResult ];
            }
         }
         request.args.set( command.restParam.name as any, rest );
      }

      const response = new Response();
      if ( command.handle !== null ) {
         command.handle( request, response );
      }
      this.prevResult = response.result;
      console.log( "result:", this.prevResult );
   }

   executeArg( command: Command, pos: number, type: Function ): any {
      try {
         let arg;
         if ( pos < command.args.length ) {
            const a = command.args[ pos ];
            if ( a instanceof BracedArg ) {
               if ( a.pipe !== null ) {
                  const executor = new Executor( this.registry, this.user,
                     a.pipe );
                  executor.execute();
                  arg = executor.prevResult;
               }
            }
            else if ( a instanceof MentionArg ) {
               arg = a.id;
            }
            else {
               arg = a.text;
            }
         } else {
            arg = this.prevResult;
         }
         if ( type !== Function && ! ( arg instanceof type ) ) {
            throw new Error( `argument ${pos + 1} of different type` );
         }
         console.log( `arg: ${arg}` );
         return arg;
      } catch ( IndexError ) {
         throw new Error( 'too little arguments' );
      }
   }

   outputResult(): string {
      let output = '';
      if ( this.prevResult !== null ) {
         for ( const result of this.prevResult ) {
            output += result.toString();
         }
      }
      return output;
   }
}