import { Question } from "./Question";
import { QuestionQuery } from "./QuestionQuery";
import * as sqlite from 'sqlite';

export class QuestionGenerator {
   constructor( private db: sqlite.Database ) {}

   async generateQuestion() {
      //const map = await this.getRandomEntity( 'map' );
      //console.log( map );

      await new Question()
         .stem( 'Who made {map} ({lump})?' )
         .stem( '{map} ({lump}) was developed by who?' )
         .stem( 'Who is the author of {map} ({lump})?' )
         .handle( async ( reply ) => {
            //q.map = 'abc';
            await this.query( `
               select author.name as author, map.name as map, map.lump 
                  from author
                  join author_map on author_map.author = author.id
                  join map on map.id = author_map.map
                  where map.id = ?` )
               .arg( arg => arg.random( 'map' ) )
               .sub( 'map' )
               .sub( 'lump' )
               .answer( 'author' )
               .run( this.db, reply );
         } ).process();

/*
      new Question( 'Who made {map}?', { map: 'map01', type: 'value' }, 'Cyber' );
      new Question( 'Who made {map}?', { map: 'projects.*.maps.*.name', type: 'value' }, 'Cyber' );
      new Question( 'Who many maps are in {project}?',
         { project: 'projects.{project}.maps', type: 'count' }, 'Cyber' );
         */
   }

   private query( query: string ): QuestionQuery {
      return new QuestionQuery( query );
   }
}