import { Bot } from '../bot';
import { Command } from '../command';
import { NormalArg } from '../Parser';

export class UppercaseCommand extends Command {
   constructor() {
      super( 'uppercase' );
      this.param( 'args' ).optional().rest();
      this.description( 'Uppercases the passed arguments' );
      this.handler( ( request, response ) => {
         let output = '';
console.log( 'uppercasing');
console.log( request);
         for ( const arg of request.args ) {
            if ( arg instanceof NormalArg ) {
               output += arg.text.toUpperCase();
            }
            console.log( arg );
         }

         response.result = output;
      } );
   }
}