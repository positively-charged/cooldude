import { Args } from '../command';

class WhoWouldWinCommand {
   private opponent1: String;
   private opponent2: String;
   //private situation: String;

   constructor( args: Args ) {
     // super();
      const a = typeof( args.a );
      const b = WhoWouldWinCommand.constructor.name;
      this.opponent1 = args.required( 'opp1', String );
      this.opponent2 = args.required( 'opp2', String );
     // this.situation = args.optional( 'situation', String, '' );
     // args[ 'opp1' ].of( String ).get();
      //args[ 'opp1' ].of( String ).optional( 'a' ).get();
      const c = import( 'discord.js' );
   }
}