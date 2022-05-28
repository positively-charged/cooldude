import { Reply } from "./Reply";

export class Question {
   constructor(
      public stems: string[] = [],
      public params: any = {},
      public answer: string = '',
      public handler: ( ( reply: Reply ) => Promise<void> )| null = null,
   ) {}

   stem( stem: string ): Question {
      this.stems.push( stem );
      return this;
   }

   handle( handler: ( reply: Reply ) => Promise<void> ): Question {
      this.handler = handler;
      return this;
   }

   async process() {
      const index = Math.floor( Math.random() *
         this.stems.length );
      const stem = this.stems[ index ];
      if ( this.handler !== null ) {
         const reply = new Reply( stem );
         await this.handler( reply );
         reply.present();
      }
   }
}