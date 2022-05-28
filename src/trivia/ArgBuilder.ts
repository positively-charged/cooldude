import { Arg } from "./Arg";

export class ArgBuilder {
   constructor(
      private arg: Arg,
   ) {}

   random( entity: string ): ArgBuilder {
      this.arg.entity = entity;
      this.arg.random = true;
      return this;
   }

   sub( param: string = '' ): ArgBuilder {
      this.arg.sub = param;
      return this;
   }
}