import { BracedArg, Command, NormalArg, Pipe, Option, MentionArg } from "./Parser";
import { Request, Response } from "./command";
import { User } from "./User";
import { CommandRegistry } from "./CommandRegistry";
import { Help } from "./Help";

/**
 * This class implements the behavior of the commands.
 */
export class CommandHandler {
   constructor(
      private registry: CommandRegistry,
   ) {}

   public execute( commandName: string, request: Request,
      response: Response ): void {
      switch ( commandName ) {
      case 'echo':
         this.handleEcho( request, response );
         break;
      case 'hello':
         this.handleHello( response );
         break;
      case 'help':
         this.handleHelp( request, response );
         break;
      case 'pick':
         this.handlePick( request, response );
         break;
      case 'who-would-win':
         this.handleWhoWouldWin( request, response );
         break;
      default:
         throw new Error( `\`${commandName}\` not implemented` );
      }
   }

   private handleHello( response: Response ): void {
      response.result = 'Hello, World!';
   }

   private handleEcho( request: Request, response: Response ): void {
      //request.args.required( 'args',  );
      //request.args.optional( 'args', 'abc' );
      //request.args.rest();

      let result: string = '';
      const args = request.args2.rest();
      for ( const arg of args ) {
         if ( result !== '' ) {
            result += ' ';
         }
         result += String( arg );
      }

      response.result = result;
   }

   private handleHelp( request: Request, response: Response ): void {
      const command = request.args2.optional();
      const help = new Help( this.registry, response );
      if ( command !== '' ) {
         response.result = help.showForCommand( command );
      } else {
         response.result = help.showForAll();
      }
      console.log( response.result );
      //help.handle( request );
   }

   private handlePick( request: Request, response: Response ): void {
      const args = request.args2.rest();
      if ( args.length > 0 ) {
         const index = Math.floor( Math.random() * args.length );
         response.result = args[ index ];
      } else {
         response.result = '';
      }
   }

   private handleWhoWouldWin( request: Request, response: Response ): void {
      const participant1 = request.args2.required();
      const participant2 = request.args2.required();
      const rest = request.args2.rest();
      // 1 vs 1
      if ( rest.length === 0 ) {
         this.oneVsOne( response, participant1, participant2 );
      }
      // One vs many.
      else {
         let participants = [];
         participants.push( participant1 );
         participants.push( participant2 );
         participants = participants.concat( rest );
         this.oneVsMany( response, participants );
      }
   }

   static readonly oneVsOneOutcomes: ( ( participant1: string,
      participant2: string ) => string ) [] = [
      ( p1, p2 ) => `${ p1 } will absolutely **EMASCULATE** ${ p2 }`,
      ( p1, p2 ) => `${ p1 } has nada of a chance against ${ p2 }`,
      ( p1, p2 ) => `Pitting ${ p1 } against ${ p2 } will result in a ` +
         `stalemate`,
   ];

   private oneVsOne( response: Response, participant1: string,
      participant2: string ): void {
      if ( Math.random() >= 0.5 ) {
         const temp = participant1;
         participant1 = participant2;
         participant2 = temp;
      }
      const index = Math.floor( Math.random() *
         CommandHandler.oneVsOneOutcomes.length );
      response.result = CommandHandler.oneVsOneOutcomes[ index ](
         participant1, participant2 );
   }

   static readonly oneVsManyOutcomes: ( ( winner: string ) => string )[] = [
      ( winner ) => `None of the others will rise above ${ winner }`,
      ( winner ) => `I'm betting all my crypto on ${ winner }`,
   ];

   private oneVsMany( response: Response, participants: string[] ): void {
      const winner = Math.floor( Math.random() * participants.length );
      const index = Math.floor( Math.random() *
         CommandHandler.oneVsManyOutcomes.length );
      response.result = CommandHandler.oneVsManyOutcomes[ index ](
         participants[ winner ] );
   }
}

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
      this.executePipe();
      const output = this.outputResult();
      return output;
   }

   private executePipe(): void {
      for ( const command of this.pipe.commands ) {
         this.executeCommand( command );
      }
   }

   private executeCommand( reading: Command ) {
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
      handler.execute( entry.name, request, response );

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