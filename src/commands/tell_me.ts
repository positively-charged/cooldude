import { Command } from '../execution/command';

export class TellMeCommand extends Command {
   // The options list must contain at least one option, because other code
   // relies on the array not being empty. 
   static readonly options: [ string, ... string[] ] = [
      'Maybe',
      'I\'d like to think so',
      'I\'m too cool for that shit',
      '**FLOCK** no',
      'I could see that happening',
      'I\'m cool and you\'re not',
      'How about no',
      'Piss off, mate',
   ];

   constructor() {
      super( 'tell-me' );
      this.handler( ( _, response ) => {
         const index = Math.floor( Math.random() *
            TellMeCommand.options.length );
         response.result = [ TellMeCommand.options[ index ] ];
      } );
   }
}