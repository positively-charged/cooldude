import { Command } from '../command';

export class PickCommand extends Command {
   constructor() {
      super( 'pick' );
      this.description( 'Selects an item from a list' );
   }
/*
   handle( request: Request, response: Response ) {
      console.log( 'args', request.args );
   }
   */
}

/*

class PickCommand extends Command {
   constructor() {
      super();
      this.option( 'randomly' );
      this.option( 'confirm' );
      command.required( 'item1' );
      command.required( 'item2' );
      command.info( 'Selects an item from a list' );
      command.handler( PickCommandHandler );
      let f: (new ( request: Request, response: Response ) => void)|
      (( request: Request, response: Response ) => void) =
      ( request: Request, response: Response ) => {};
      f = PickCommandHandler;
      command.handler( ( request: Request, response: Response ) => {
         const user1 = request.arg( 'item1', User );
         const user2 = request.arg( 'item2', User );
      } );
   }
}

class PickCommandHandler {
   private randomly: boolean;
   private confirm: boolean;

   private items: string[] = [];
   
   constructor( request: Request, response: Response ) {
      this.randomly = options.has( 'randomly' );
      this.confirm = options.has( 'confirm' );
      this.items.push( args.get( 'item1', String ) );
      this.items.push( args.get( 'item2', String ) );
   }

   handle() {

   }
}*/