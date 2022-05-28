export class Store {
   root: any;
   current: any;
   parents: any[];
   temporary: any;

   constructor( root: any = {} ) {
      this.root = root;
      this.parents = [];
      this.current = this.root;
      this.temporary = null;
   }

   enter( path: string, temporarily = false ): Store {
      let node = this.current;
         if ( path !== '' ) {
         const components = path.split( '.' );
         for ( let component of components ) {
            if ( ! ( node instanceof Object ) ) {
               throw new Error( `${path} is a value` );
            }

            component = component.trim();
            if ( component === '*' ) {
               const keys = Object.keys( node );
               if ( keys.length === 0 ) {
                  throw new Error( 'empty path component' );
               }
               component = keys[ 0 ];
            }

            if ( ! ( component in node ) ) {
               node[ component ] = {};
            }

            if ( ! temporarily ) {
               this.parents.push( node );
            }

            node = node[ component ];
         }
      }
      if ( temporarily ) {
         this.temporary = node;
      }
      else {
         this.current = node;
      }
      return this;
   }

   carve( path: string, value: string ): Store {
      const components = path.split( '.' );
      let last = components.pop();
      this.enter( components.join( '.' ), true );
      if ( last !== undefined ) {
         this.temporary[ last ] = value;
      }
      return this;
   }

   set( property: string, value: string ): Store {
      this.carve( property, value );
      return this;
   }

   leave(): Store {
      this.current = this.parents.pop();
      return this;
   }

   reset() {
      this.current = this.root;
      this.parents = [];
      this.temporary = null;
   }
}