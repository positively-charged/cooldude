import { BracedArg, Command, NormalArg, Pipe, Option, MentionArg } from "../Parser";
import { Request, Response } from "./command";
import { User } from "../User";
import { CommandRegistry } from "./CommandRegistry";
import { Help } from "./Help";
import { CommandHandler } from "./CommandHandler";

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

   public async execute(): Promise<string> {
      await this.executePipe();
      const output = this.outputResult();
      return output;
   }

   private async executePipe(): Promise<void> {
      for ( const command of this.pipe.commands ) {
         await this.executeCommand( command );
      }
   }

   private async executeCommand( reading: Command ) {
      let pos = 0;

      let name = reading.name;
      if ( name === '' ) {
         throw new Error( 'missing command name' );
      }

      // Command names are case-insensitive.
      const normalizedName = name.toLowerCase();
      const entry = this.registry.get( normalizedName );
      if ( entry === null ) {
         throw new Error( `I don\'t understand what \`${name}\` means` +
            `\nUse the \`help\` command to list available commands` );
      }

      let request = new Request( this.user, entry );
      request.options = reading.options as any;
      
      this.pushArgs( reading, request );
      /*
      for ( let param of entry.params ) {
         const arg = this.executeArg( reading, pos, Function );
         request.args.set( param.name as any, arg );
         ++pos;
      }

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
*/
      const response = new Response();

      const handler = new CommandHandler( this.registry );
      await handler.execute( entry.name, request, response );

      /*
      if ( command.handle !== null ) {
         command.handle( request, response );
      }
      */

      this.prevResult = response.result;
   }

   private pushArgs( command: Command, request: Request ): void {
      for ( const arg of command.args ) {
         if ( arg instanceof BracedArg ) {
            if ( arg.pipe !== null ) {
               const executor = new Executor( this.registry, this.user,
                  arg.pipe );
               executor.execute();
               request.addArg( executor.prevResult );
            }
         }
         else if ( arg instanceof MentionArg ) {
            request.addArg( arg.id );
         }
         else if ( arg instanceof NormalArg ) {
            request.addArg( arg.text );
         }
         else {
            request.addArg( arg.name );
         }
      }
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
            else if ( a instanceof NormalArg ) {
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