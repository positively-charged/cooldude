import { Response } from "./command";
import { CommandEntry, CommandRegistry } from "./CommandRegistry";

export class Help {
   constructor(
      private commands: CommandRegistry,
      private response: Response,
   ) {}

   public showForCommand( command: string ): string {
      const entry = this.commands.get( command );
      if ( entry !== null ) {
         return this.generateUsage( entry ) + "\n" +
               entry.description;
      } else {
         return `\`${ command }\` command does not exist`;
      }
   }

   private generateUsage( entry: CommandEntry ): string {
      let usage = `${ entry.name }`;
      if ( entry.params.length > 0 ) {
         for ( const param of entry.params ) {
            if ( param.gotOptional ) {
               usage += ' [' + param.name + ']';
            }
            else {
               usage += ' <' + param.name + '>';
            }

            if ( param.gotRest ) {
               usage += '...';
            }
         }
      }
      return usage;
   }

   public showForAll(): string {
      return '';  
   }
}