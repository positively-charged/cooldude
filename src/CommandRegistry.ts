import { Command } from "./command";

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

export class CommandEntry {
   constructor(
      public name: string,
      public params: Param[] = [],
      public description: string = '',
   ) {}
}

export class CommandEntryBuilder {
   constructor(
      private entry: CommandEntry,
   ) {}

   public param( name: string ): Param {
      const param = new Param( name );
      this.entry.params.push( param );
      return param;
   }

   public description( description: string ): CommandEntryBuilder {
      this.entry.description = description;
      return this;
   }
}

export class ArgReader {
   private args: string[] = [];
   private pos = 0;

   constructor(
      private entry: CommandEntry,
   ) {}

   public add( value: string ): void {
      this.args.push( value );
   }

   public required(): string {
      if ( this.pos < this.args.length ) {
         const arg = this.args[ this.pos ];
         ++this.pos;
         return arg;
      } else {
         throw new Error( 'too little arguments' );
      }
   }

   public optional( defaultValue = '' ): string {
      if ( this.pos < this.args.length ) {
         const arg = this.args[ this.pos ];
         ++this.pos;
         return arg;
      } else {
         return defaultValue;
      }
   }

   /**
    * Gets remaining arguments.
    */
   public rest(): string[] {
      const args: string[] = this.args.slice( this.pos );
      this.pos += args.length;
      return args;
   }

   public left(): number {
      return this.args.length - this.pos;
   }
}

export class CommandRegistry {
   private handlers: Map<string, Command<any, any>>;
   private entries: Map<string, CommandEntry>;

   constructor() {
      this.handlers = new Map();
      this.entries = new Map();
      this.defineCommands();
   }

   private defineCommands(): void {
      this.define( 'hello' )
         .description( 'Prints a hello message' );
      this.define( 'echo' )
         .description( 'Prints the arguments passed' )
         .param( 'args').optional().rest();
      this.define( 'pick' )
         .description( 'Selects an item from the specified list' )
         .param( 'args').optional().rest();
      this.define( 'help' )
         .description( 'Show information about commands' )
         .param( 'command' ).optional();
      const entry = this.define( 'who-would-win' )
         .description( 'Predicts who would win in a battle' );
      entry.param( 'participant1' );
      entry.param( 'participant2' );
      entry.param( 'others' ).optional().rest();
   }

   public get( name: string ): Readonly<CommandEntry> | null {
      const entry = this.entries.get( name );
      if ( entry !== undefined ) {
         return entry;
      }
      return null;
   }

   private define( name: string ): CommandEntryBuilder {
      const entry = new CommandEntry( name );
      this.entries.set( name, entry );
      return new CommandEntryBuilder( entry );
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

   public list(): string[] {
      const names: string[] = [];
      this.entries.forEach( entry => {
         names.push( entry.name );
      } );
      names.sort();
      return names;
   }
}


import { Bot } from './bot';

interface ConstructableCommand {
   new ( bot: Bot ): Command;
}

export async function createRegistry( bot: Bot ): Promise<CommandRegistry> {
   const registry = new CommandRegistry();
   //registry.add( new HelloHandler() );
   //registry.add( new HelloCommand( bot ) );
   //const module = await import( './commands/hello' );
   //registry.add( new module.HelloCommand( bot ) );
   //registry.add( new PickCommand() );
   //registry.add( new EchoCommand() );
   //registry.add( new TellMeCommand() );
   //registry.add( new UppercaseCommand() );

   //const c: ConstructableCommand = TellMeCommand;
   //new c( bot );
   return registry;
}