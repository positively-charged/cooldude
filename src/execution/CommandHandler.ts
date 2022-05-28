import { Request, Response } from "./command";
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