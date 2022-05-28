import { Bot } from '../bot';
import { Command } from '../command';

export class HelloCommand extends Command {
   constructor( bot: Bot ) {
      super( 'hello' );
      this.description( 'Prints a hello message' );
      this.handler( ( _, response ) => {
         response.result = 'Hello, World!';
      } );
   }
}