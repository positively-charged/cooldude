import { Channel, Client, Intents, Message, MessageEmbed, Permissions, Role, TextChannel } from 'discord.js';
import { Executor } from './Executor';
import { createRegistry } from './command';
import { Lexer, Token, TokenType } from './Lexer';
import { Parser } from './Parser';
import { User } from './User';
import process from 'process'

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
            const executor = new Executor( registry, user, request.pipe )
            const output = executor.execute();
            if ( output !== '' ) {
               message.channel.send( output );
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

export async function runBot( token: string ) {
   // Create a new client instance
   const client = new Client( { intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES
   ] });

   // When the client is ready, run this code (only once)
   client.once( 'ready', client => {
      process.on( 'SIGINT', () => {
         client.destroy();
      } );

      // const bot = new Bot( client );

      client.channels.cache.forEach( async ( channel, name ) => {
         if ( channel.type === 'GUILD_TEXT' && channel.name === 'general' ) {
            await sendEmbed( channel );
         }
      } );
   });
   
   // Login to Discord with your client's token
   await client.login( token );
}

async function sendEmbed( channel: TextChannel ) {
   const embed = new MessageEmbed();
   embed.setTitle( 'Music' );
   embed.setColor( '#FF0000' );
   embed.addField( 'MAP01', 'Mus01', true );
   embed.addField( 'MAP02', 'Mus02', true );
   embed.setDescription( `This is a multi-line
   description.

   Another line.` );
   await channel.send( { content: 'Hello', embeds: [ embed ] } );
}