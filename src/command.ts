import { Options } from 'discord.js';
import { ArgReader, CommandEntry } from './CommandRegistry';
import { Option } from './Parser';
import { User } from './User';

export class Request<T = string, O extends string = string> {
   options: Map<O, Option|Option[]> = new Map();
   args: Map<T, any> = new Map();
   args2: ArgReader;
   constructor( public user: User, entry: CommandEntry ) {
      this.args2 = new ArgReader( entry );
   }

   arg( name: string, type: Function = Function ) {

   }

   public addArg( value: string, type: Function = Function ): void {
      this.args2.add( value );
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