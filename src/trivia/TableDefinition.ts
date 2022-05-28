import * as sqlite from 'sqlite';
import { Table } from "./Table";

export class TableDefinition {
   private name: string;
   private fields: string[];
   
   constructor( name: string ) {
      this.name = name;
      this.fields = [];
   }

   async create( db: sqlite.Database ): Promise<Table> {
      const query = this.createQuery();
      await db.exec( query );
      return new Table( db, this.name, this.fields );
   }

   addField( name: string ) {
      this.fields.push( name );
   }

   private createQuery(): string {
      let query = ``;
      query += `drop table if exists ${this.name};\n`;
      query += `create table ${this.name} (\n`;
      query += `   id text`;
      for ( const name of this.fields ) {
         query += `,\n   ${name} text`;
      }
      query += '\n)';
      return query;
   }
}