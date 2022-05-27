import process from 'process';
import fs from 'fs/promises';
import parseArgs from 'minimist';
import { Bot } from "./bot";
import { Channel, Client, Intents, Message, MessageEmbed, Permissions, Role, TextChannel } from 'discord.js';


class Options {
   constructor(
      public token: string = '',
   ) {}
}

// Entry point.
( async() => {
   const options = readOptions();
   const token = await readToken( options );
   runBot( token );
} )();

function readOptions(): Options {
   // Get the program arguments, skipping the path arguments for the node
   // binary and the script.
   let args = parseArgs( process.argv.slice( 2 ) );

   if ( ! ( 'token' in args ) ) {
      console.log( 'error: missing --token option' );
      process.exit( 1 );
   }
   
   return new Options( args[ 'token' ] );
}

async function readToken( options: Options ): Promise<string> {
   return fs.open( options.token, 'r' ).then( async handle => {
      const content = await handle.readFile( 'utf8' );
      await handle.close();
      return content.trim();
   } ).catch( reason => {
      console.log( 'error: failed to open token file (%s)', reason );
      process.exit( 1 );
   } );
}

export async function runBot( token: string ) {
   // Create a new client instance
   const client = new Client( { intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
   ] });

   // When the client is ready, run this code (only once)
   client.once( 'ready', client => {
      process.on( 'SIGINT', () => {
         client.destroy();
      } );

      const bot = new Bot( client );

      /*
      client.channels.cache.forEach( async ( channel, name ) => {
         if ( channel.type === 'GUILD_TEXT' && channel.name === 'general' ) {
            await sendEmbed( channel );
         }
      } );
      */
   });
   
   // Login to Discord with your client's token
   await client.login( token );
}

async function sendEmbed( channel: TextChannel ) {
   const embed = new MessageEmbed();
   embed.setTitle( 'Music' );
   embed.setColor( '#FF0000' );
   embed.addField( '1️⃣', '**MAP60** -- 40 Below Zero' );
   embed.addField( '2️⃣', '**MAP52** -- Vivid Dreams, Sweetheart' );
   embed.addField( '3️⃣', '**MAP55** -- Bloody Donation' );
   embed.addField( '4️⃣', '**MAP57** -- Core Dump' );
   embed.setDescription( `This is a **multi-line**
   description.

   Another line.
   
   1️⃣ **MAP60** -- 40 Below Zero
   
   2️⃣ **MAP52** -- Vivid Dreams, Sweetheart

   3️⃣ **MAP55** -- Bloody Donation
   
   4️⃣ **MAP57** -- Core Dump

   ` );
   await channel.send( { content: 'Hello', embeds: [ embed ] } ).then(
      message => {
         message.react( '1️⃣' );
         message.react( '2️⃣' );
         message.react( '4️⃣' );
      }
   );
}