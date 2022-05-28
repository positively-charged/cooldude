export class Reply {
   private subs: { [ k: string ]: string };

   constructor(
      public stem: string,
      public answer: string = '',
   ) {
      this.subs = {};
   }

   sub( name: string, value: string ) {
      this.subs[ name ] = value;
   }

   present() {
      let stem = this.stem;
      for ( const [ name, value ] of Object.entries( this.subs ) ) {
         stem = stem.replace( `{${name}}`, value );
      }
      console.log( 'question: %s', stem );
      console.log( 'answer: %s', this.answer );
   }
}