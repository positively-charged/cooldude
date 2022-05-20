import discord from "discord.js";

/**
 * Encapsulates a Discord guild member.
 */
export class User {
   name: string = 'abc';
   constructor( private member: discord.GuildMember|null = null ) {}

   /**
    * Prevents a user from chatting. To allow a user to chat again, call
    * `unmute()`.
    */
   mute() {
      /*
      const role = this.member.guild.roles.cache.find( role => role.id == '7' );
      if ( role !== undefined )
      this.member.roles.add( role );
      */
   }

   unmute() {/*
      const role = this.member.guild.roles.cache.find( role => role.id == '7' );
      if ( role !== undefined )
      this.member.roles.remove( role ).catch( ( reason ) => {
         //console.log( 'failed to 
      } );
*/
   }

   /**
    * Removes the user from all the channels and puts them in a special
    * channel, dubbed "prison.".
    */
   imprison() {}
   release() {}
}