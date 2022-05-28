import { Util, Channel, Client, Intents, Message, MessageEmbed, Permissions, Role, TextChannel } from 'discord.js';
import { Executor } from './execution/Executor';
import { Lexer, Token, TokenType } from './Lexer';
import { Parser } from './Parser';
import { User } from './User';
import process from 'process'
import { createRegistry } from './execution/CommandRegistry';
import { Help } from './execution/Help';
import { Response } from './execution/command';

export class Bot {
   constructor( private client: Client ) {
      if ( client.user !== null ) {
         console.log( 'id: %s', client.user.id as any - 1 );
         console.log( 'discriminator: %s', client.user.discriminator );
         console.log( 'tag: %s', client.user.tag );
         console.log( 'username: %s', client.user.username );
      }

      client.on( 'messageCreate', async message => {
         this.onMessageCreate( message );
      } );

      client.channels.cache.forEach( async ( channel, name ) => {
         if ( channel.type === 'GUILD_TEXT' && channel.name === 'general' ) {
            console.log( name );
            console.log( channel );
            await channel.send( `Hello, ${channel}!` );
         }
      } );
   }

   private async onMessageCreate( message: Message ) {
      console.log( message );
      /*
      message.member?.roles.cache.forEach( ( role: Role ) => {
         console.log( role );
         console.log( role.permissions.toArray() )
         console.log( role.permissions.has( Permissions.FLAGS.ADMINISTRATOR ) )
         console.log( message.member?.permissions.has( Permissions.FLAGS.ADMINISTRATOR )  )
         console.log( `name: ${ role.name }, id: ${ role.id }` );
      });
      */
      //message.
      this.runCommand( message );
      if ( message.content.trim().toLocaleLowerCase() === 'exit' ) {
         await message.channel.send( 'shutting down' );
         message.client.destroy();
      }
   }

   private async runCommand( message: Message ) {
      // Ignore messages from the bot itself.
      if ( message.client.user !== null &&
         message.author.equals( message.client.user ) ) {
         console.log( 'message from self' );
         return;
      }

      const lexer = new Lexer( message.content );
      const parser = new Parser( lexer );
      const request = parser.readRequest();
      if ( request !== null && request.recipient === this.client.user?.id ) {
         let user = new User();
         const registry = await createRegistry( this );
         try {
            let output;
            if ( request.pipe.commands.length === 0 ) {
               const response = new Response();
               const help = new Help( registry, response );
               output = help.showForAll();
            } else {
               const executor = new Executor( registry, user, request.pipe )
               output = await executor.execute();
            }
            if ( output !== '' ) {
               const escapedOutput = output.replaceAll( '\\', '\\\\' );
               message.channel.send( escapedOutput );
               console.log( escapedOutput );
               console.log( Util.escapeMarkdown( output ) );
            }
         } catch ( err ) {
            if ( err instanceof Error ) {
               await message.channel.send( err.message );
               console.log( err );
            }
         }
      }
   }
}