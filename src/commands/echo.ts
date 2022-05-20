import { Command, Response, Request } from "../command";
import { Option } from "../Parser";

type Args = 'args';
type Options = 'repeat';

type Option2<T> = T|null;

class C {
   _repeat: Option2<string> = '';

   set repeat( value: string ) {
      this._repeat = value;
   }
}

let c = new C();
c.repeat = 'a';

export class EchoCommand extends Command<Args, Options> {
   constructor() {
      super( 'echo' );
      this.option( 'repeat' );
      this.param( 'args' ).optional().rest();
      this.handler( ( request, response ) =>
         this.handle2( request, response ) );
   }

   private handle2( request: Request<Args, Options>, response: Response ) {
      let times = 1;
      console.log( request);
      if ( 'repeat' in request.options ) {
         const option = request.options.get( 'repeat' );
         if ( option instanceof Option && option.value != null ) {
            const count = Number( option.value );
            if ( count > 0 ) {
               times = count;
            }
         }
      }

      request.arg( 'args', Array );

      let result: string = '';
      for ( let i = 0; i < times; ++i ) {
         for ( const arg of request.args.get( 'args' ) ) {
            if ( result !== '' ) {
               result += ' ';
            }
            result += String( arg );
         }
      }
      response.result = result;
   }
}