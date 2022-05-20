import { Options } from 'discord.js';
import { Option } from './Parser';
import { User } from './User';

export class Request<T = '', O extends string = string> {
   options: Map<O, Option|Option[]> = new Map();
   args: Map<T, any> = new Map();
   constructor( public user: User ) {}

   arg( name: string, type: Function = Function ) {

   }
}

export class Response {
   result: any = null;
      
   append( result: any ) {
      this.result.push( result );
   }
}

/**/
export class Option2 {
   value: boolean = false;
   desc: string = '';
   constructor( public name: string ) {}
   requiresValue(): Option2 { this.value = true; return this; };
   description( desc: string ): Option2 { this.desc = desc; return this; } 
}

class Param {
   name: string;
   gotOptional = false;
   gotRest = false;

   constructor( name: string ) {
      this.name = name; 
   }

   optional(): Param {
      this.gotOptional = true;
      return this;
   }

   rest(): Param {
      this.gotRest = true;
      return this;
   }
}

type CommandHandler<T, O extends string> = ( ( request: Request<T, O>, response: Response ) => void );



/**
 * The base class for all commands.
 */
export abstract class Command<T extends string = string,
   O extends string = string> {
   name: string;
   params: Param[];
   restParam: Param|null;
   handle: CommandHandler<T, O>|null;

   protected constructor( name: string ) {
      this.name = name;
      this.params = [];
      this.restParam = null;
      this.handle = null;
   }

   protected option( name: O, arg: boolean = false ): Option2 {
      return new Option2( name );
   }

   protected param( name: T ): Param {
      const param = new Param( name );
      this.params.push( param );
      return param;
   }

   protected description( name: string ): void {}

   protected handler( handler: CommandHandler<T, O> ): void {
      this.handle = handler;
   }
}

export class CommandRegistry {
   private handlers: Map<string, Command<any, any>>;

   constructor() {
      this.handlers = new Map();
   }

   add<T2 extends string, O extends string>( command: Command<T2, O> ) {
      if ( ! ( command.name in this.handlers ) ) {
         this.handlers.set( command.name, command );
      }
   }

   find( name: string ): Readonly<Command>|null {
      const handler = this.handlers.get( name );
      if ( handler !== undefined ) {
         return handler;
      }
      return null;
   }
}
type Constructor<T> =  new( ... args: any[] ) => T;

export class Args {
   public a: unknown[] = [];
   public b: number = 0;
   private args: Map<string, string> = new Map();

   get<T>( name: string, c: Constructor<T> ): T {
      const a = this.a[ this.b ];
      const b = typeof a;
      if ( a instanceof c ) {
         return a;
      }
      throw new Error();
   }

   required( name: string, constructor?: Function ): any {
      const arg = this.args.get( name );
      if ( arg === undefined ) {
         throw new Error();
      }
      if ( constructor !== undefined && arg.constructor !== constructor ) {
         throw new Error();
      }
      return arg;
   }
}


import { HelloCommand } from './commands/hello';
import { TellMeCommand } from './commands/tell_me';
import { EchoCommand } from './commands/echo';
import { PickCommand } from './commands/pick';
import { Bot } from './bot';

interface ConstructableCommand {
   new ( bot: Bot ): Command;
}

export async function createRegistry( bot: Bot ): Promise<CommandRegistry> {
   const registry = new CommandRegistry();
   //registry.add( new HelloHandler() );
   //registry.add( new HelloCommand( bot ) );
   const module = await import( './commands/hello' );
   registry.add( new module.HelloCommand( bot ) );
   registry.add( new PickCommand() );
   registry.add( new EchoCommand() );
   registry.add( new TellMeCommand() );

   const c: ConstructableCommand = TellMeCommand;
   new c( bot );
   return registry;
}