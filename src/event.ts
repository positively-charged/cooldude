import { User } from "./User";

/*

class ClearPunishmentUpdate {
   constructor( bot: Bot ) {
      const event = bot.event.wakeup().every( 12 );
      event.listen( this.f );
      const event2 = new WhoWouldWinWinnerEvent();
      event2.handle( ( winner: string ) => {
         console.log( 'winner is %s', winner );
      } );
      bot.event.listen( event2 );
      listen( WhoWouldWinWinnerEvent, event => { event.a; } );
   }
}
*/

// Registers an event listener.
function listen<T extends new ( ...args: any[] ) => any>(
   event: T, listener: ( a: Readonly<InstanceType<T>> ) => void ) {

   listener( new event( ... [ new User() ] ) );
   }

// An event.
class JoinEvent { constructor( public user: User ) {} }
class QuitEvent { constructor( public n = 123 ) {} }

// Listen to event.
//listen( JoinEvent, event => console.log( `Hello, ${ event.user.name }!` ) );

type Listener<EventConstructor extends new ( event: any ) => void> =
   ( event: Readonly<InstanceType<EventConstructor>> ) => void;

class EventDispatcher {
   private events: Map<Function, Listener<any>[]>;

   constructor() {
      this.events = new Map();
   }

   listen<T extends new ( event: any ) => void>( event: T,
      listener: Listener<T> ) {
      let listeners = this.events.get( event );
      if ( listeners === undefined ) {
         listeners = [];
         this.events.set( event, listeners );
      }
      listeners.push( listener );
   }

   emit<T extends object>( event: T ) {
      const listeners = this.events.get( event.constructor );
      if ( listeners !== undefined ) {
         for ( const listener of listeners ) {
            listener( event );
         }
      }
   }
}

const dispatcher = new EventDispatcher();
dispatcher.listen( JoinEvent,
   ( event ): number => { console.log( `Hello, ${ event.user.name }!` ); return 1; } );
dispatcher.listen( JoinEvent,
   event => console.log( `Hello2, ${ event.user.name }!` ) );
dispatcher.listen( QuitEvent,
   event => console.log( `quit event ${ event.n }!` ) );
const event = new JoinEvent( new User() );
const event2 = new QuitEvent( 321 );
dispatcher.emit( event );
dispatcher.emit( event );
dispatcher.emit( event2 );