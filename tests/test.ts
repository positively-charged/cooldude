
/*
enum a {
   
}

let b: String = 'abc';

beforeAll( () => console.log( 'before all' ) );

test( 'abc', () => {
   expect( b ).toBe( 'abc' );
   const a = { a: 123 };
   expect( a ).not.toBe( { a: 123 } );
   expect( undefined ).not.toBeDefined();
   expect( 'abc123' ).toMatch( /[a-z]+[\d]+/ );
   expect( () => f() ).toThrow( 'a' );console.log( 'test' )
   expect.assertions( 5 );
} );

test( '2', () => {
   expect( true ).toBe( true );
} );

function f() {
   throw new Error( 'abc' );
}

const callback = () => 123;
const fn = jest.fn( callback );
fn.mockName( 'mocked f' );
fn();
f2( fn );
console.log( fn.mock );
console.log( fn.mock.results[ 1 ] );

function f2( f: () => number ) {
   f();
}

import bot from '../src/bot';
import discord from 'discord.js';
import { mocked } from 'ts-jest/utils';

jest.mock( '../src/bot' );
jest.mock( 'discord.js' );

const mockedDiscord = mocked( discord, true );

test( 'mock', () => {
   console.log( bot );
   bot.f();
   fn.mockImplementationOnce( () : number => 111 );
   fn.mockImplementationOnce( () : number => 222 );
   fn();
   fn();
   fn();
   console.log( fn.mock );
   expect( fn ).toHaveBeenCalled();
   expect( fn ).toMatchSnapshot( 'fn' );
} );
*/


import { Bot } from '../src/bot';
import { Lexer, TokenType as Tk } from '../src/Lexer';
import { Client, GuildResolvable, User } from 'discord.js';
import discord from 'discord.js';
import { mocked } from 'ts-jest/utils';

//const d = jest.mock( 'discord.js' );
//const mockedDiscord = mocked( discord, true );

test( 'parsing of all possible tokens', () => {
   const lexer = new Lexer( `
      |\`!=abc123"321cba"{} <@1234> <@!4321> @#$
   ` );
   expect( lexer.read() ).toStrictEqual( token( Tk.BAR ) );
   expect( lexer.read() ).toStrictEqual( token( Tk.TICK ) );
   expect( lexer.read() ).toStrictEqual( token( Tk.BANG ) );
   expect( lexer.read() ).toStrictEqual( token( Tk.EQ ) );
   expect( lexer.read() ).toStrictEqual( token( Tk.ID, 'abc123' ) );
   expect( lexer.read() ).toStrictEqual( token( Tk.STRING, '321cba' ) );
   expect( lexer.read() ).toStrictEqual( token( Tk.LBRACE ) );
   expect( lexer.read() ).toStrictEqual( token( Tk.RBRACE ) );
   expect( lexer.read() ).toStrictEqual( token( Tk.MENTION, '1234' ) );
   expect( lexer.read() ).toStrictEqual( token( Tk.MENTION, '4321' ) );
   expect( lexer.read() ).toStrictEqual( token( Tk.NORMAL_ARG, '@#$' ) );
   expect( lexer.read() ).toStrictEqual( token( Tk.END ) );
} );

function token( type: Tk, text: string = '' ) {
   return { type, text };
}

interface Mock<T> {
   func( c?: any): Mock<T>;
   done(): T;
}

function dummy<T>( ... args: any[] ): Mock< T> {
   return {} as any;
}

function dummyFunc<T extends ( ...a: any[] ) => any>(
   f: ( a: Parameters<T> ) => ReturnType<T> ): T {
   return {} as any;
}


class Store {
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

   set( path: string, value: string ): Store {
      const components = path.split( '.' );
      let last = components.pop();
      this.enter( components.join( '.' ), true );
      if ( last !== undefined ) {
         this.temporary[ last ] = value;
      }
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


test( 'music command', () => {
   const target = dummy<Client>();
   const handler = new Handler();
   const f = function() { };
   f.toString = function() { throw new Error(); }
   f.d = 123;
   f.funcs = {} as any;
   f.funcs.on = ( ... args: any[] ) => {
      console.log( args );
   };

   /*
   const proxy: Client = new Proxy( f, handler );
   //console.log( '%s', proxy );
   proxy.emit = function(): any {};
   //proxy.emit = dummy( obj => obj.func( () => {} ) ).done();
   //proxy.emit = dummyFunc(  );
   proxy.token = 'a';

   type Callable = ( ...a: any[] ) => any;
   type CallHandler<T extends Callable> =
      ( ... a: Parameters<T> ) => ReturnType<T>;
   interface M<T  extends Callable> {
      calls( f: CallHandler<T>|ReturnType<T> ): M<T>;
      calls( args: any[], f: CallHandler<T>|ReturnType<T> ): M<T>;
      returns<T2  extends ( ...a: any[] ) => any>( a: ReturnType<T2> ): M<T2>;
      returnsResolvedValue<T2>( value: T2 ): Promise<T2>;
   }

   interface PropertyMock<T> {
      gets( ... values: T[] ): PropertyMock<T>;
      always: PropertyMock<T>;
   }

   function f2<T = undefined>( a?: T ) {}
   f2();
   f2( 123 );

   type Type<T> = [ T ] extends [ ( ...a: any[] ) => any ] ? M<T>
      : PropertyMock<T>;
   function mock<T>(): T;
   function mock<T>( a: T ): Type<T>;
   function mock<T>( a?: T ): any {
      return 1 as any;
   }

   const proxy2: Client = mock<Client>();
   mock( proxy2.fetchGuildPreview )
      .calls( ( a ): any => {
         
      } )
      .calls( ( a ): any => {} )
      .returns( Promise.resolve( 8 as any ) )
      .returnsResolvedValue( 8 );
   mock( proxy2.token ).always.gets( 'abc', null );
   mock( proxy2.guilds.cache.get )
      .calls( [ 4 ], mock() );
   mock( proxy2.user?.username ).gets( 'abc' );
   */
   /*
   mock( proxy2.user! ).gets( {
      username: '',
      bot: false,
   } );
   const u: Exclude<Partial<User>, 'toString'> = { client: 'k' };
   type A<T, U> = {
      [ K in keyof T ]: U[ K ];
      // toString: string;
   }

   let b: Partial<Omit<User, 'toString'>> = { username: ''};
   */
  
   {
   const proxy: any = new Proxy( f, handler );
   //proxy.a.b.c.token = 'abc';
   //proxy.a.b.c();
   //console.log( proxy() );
   //console.log( proxy.d );

   //proxy.mock.on = function() { }
   //console.log( proxy.abc.cba );
   //new Bot( proxy );
   //console.log( typeof proxy );


   /*
   const user = proxy.user;
   mock( user.username ).returns( 'abc' );
   mock( user.bot ).returns( false );

   user.username = 'abc';
   user.username = 'abc';

   class A<T> {
      get f<K extends keyof T> (): any {
         return 0 as any
      }

      get mock(): T {
         return 0 as any;
      }

      get jest(): jest.Mock<T, any> {
         return 0 as any;
      }
      
   } 

   const fn = jest.fn();
   const a: A<Client> = 0 as any;
   a.mock.user.username = 'abc';
   stub( a.user.username ) = 'abc';
   stub( a.user.username ) = 'abc';

   a.jest.mock;

   let u: Partial<Omit<User, 'toString'| 'valueOf'>> = 0 as any;
   u = { username: 'a', bot: false };
   u = { username: 'a', bot: false };
   u
   
   expect( mock( user ).jest )*/

     // o = Object.create( Client );
      //Object.setPrototypeOf( o, Client.prototype );
      //console.log( o instanceof Client );


   }

} );

type Callable = ( ( ... args: any[] ) => any );

test.only( 'mock object', () => {
   function f() { console.log( 'hello'); return 123; }

   f();

   const f2 = mock( f );
   mock( f2, 'modify' ).returns( 111 ).returns( 222 );
   f2();
   f2();
   //mock( f2, 'modify' ).jest.mockReturnValue( 123 );

   expect( f2 ).toBeCalledTimes( 2 );
   /*
   console.log( f2() );
   console.log( f2() );
   f2();

   let a = mock( { a: 123 } );
   a.a = 321;
*/
   process.exit( 1 );

   let client = mock( Client );
   /*
   expect( client ).toBeInstanceOf( Client );

   mock( client, 'modify' );

   const o = mock( client.toJSON, 'modify' );
   o.returns( 123 ).returns( 321 );
   mock( client.isReady, 'modify' ).returns( true );
   console.log( client.isReady() );
   */

   //expect( client ).toEqual( client );
   //client.token = 'abc';
   //expect( client.token ).toStrictEqual( 'abc' );
   //console.log( client === client );
   client.toJSON();
   client.toJSON();
   client.toJSON();
   client.addListener( 0 as any, 2 as any );
   expect( client.toJSON ).toBeCalled();
   expect( client.toJSON ).toBeCalledTimes( 3 );
   expect( client.addListener ).toBeCalledTimes( 1 );
   expect( client.addListener ).toHaveBeenCalledWith( 0, 2 );
} );


import { EventEmitter } from 'node:events';
class MockModify<T> {
   constructor( private object: T ) {}

   returns<T2 extends Callable & T>( value: ReturnType<T2> ): MockModify<T> {
      //value._mock.
      return this;
   }
}

class ObjectMockModify<T> {

}

type Constructable = new ( ... args: any ) => any;
type MockReturnType<T> = T extends Constructable ? InstanceType<T>
   : MockModify<T>;

function mock<T extends Constructable>( constructor: T ): InstanceType<T>;
function mock<T extends Constructable>( constructor: T ): InstanceType<T>;
function mock<T extends Callable>( func: T ): T;
function mock<T extends Callable>( func: T, mode: 'modify' ): MockModify<T>;
function mock<T extends object>( object: T ): T;
function mock<T extends object>( object: T, mode: 'modify' ): MockModify<T>;
function mock<T>( arg: T, mode: 'create' | 'modify' = 'create'  ): any {
   if ( mode === 'create' ) {
      if ( ! ( '_mock' in arg ) ) {
         process.stdout.write( "new mock\n" );
         const target = () => {};
         if ( typeof arg === 'function' ) {
            Object.setPrototypeOf( target, arg.prototype ); 
         }
         const handler = new Handler();
         const proxy = new Proxy( target, handler );
         Object.defineProperty( arg, '_mock', { value: { target, handler } }  );
         return proxy;
      } else {
         return ( arg as any )._mock;
      }
   } else {
      process.stdout.write( "modifying mock\n" );
      return new MockModify<T>( arg );
   }
}

type Prop = { [ name: string ]: string|Prop };

class Member {
   constructor(
      public name: string = '',
      public body: Map<string, Member> = new Map(),
      public jestFn: jest.Mock|null = null, 
   ) {}
}

class Handler {
   func = null as any;

   private rootMember: Member;
   private member: Member;
   private prop: string;

   constructor() {
      this.rootMember = new Member();
      this.member = this.rootMember;
      this.prop = '';
   }

   [Symbol.toPrimitive](hint: any) {

   }

   get( target: any, prop: any, receiver: any ): any {
      process.stdout.write( `getting: ${prop}\n` );
      if ( this.member.jestFn !== null ) {
         if ( prop in this.member.jestFn ) {
            if ( prop === '_isMockFunction' ) {
               console.log( 'no' );
               return false;
            }
            process.stdout.write( `value: ${
               Reflect.get( this.member.jestFn, prop )}\n` );
            return Reflect.get( this.member.jestFn, prop );
         }
         console.log( 'yes 2' );
         //return this.member.jestFn;
      }

      let member = this.member.body.get( prop );
      if ( member === undefined ) {
         member = new Member( prop );
         this.member.body.set( member.name, member );
         //this.member = member;
      }
      //this.prop = prop;

      /*
      console.log( prop );
      if ( prop === Symbol.toPrimitive ) {
         throw new Error();
      }
      if ( prop in target ) {
         return target[ prop ];
      } else if ( prop in target.funcs ) {
         this.func = target.funcs[ prop ];
      }*/

      let handler = new Handler();
      handler.rootMember = this.rootMember;
      handler.member = member;

      return new Proxy( target, handler );
   }

   set( target: any, prop: any, value: any ): boolean {
      this.enter( prop );
      process.stdout.write( `setting: ${prop}\n` );
      target[ prop ] = value;
      return true;
   }

   private enter( prop: any ) {
      const member = this.member.body.get( prop );
      if ( member !== undefined ) {
         this.member = member;
         //this.prop = this.member.name;
      } else {
         const member = new Member( prop );
         this.member.body.set( member.name, member );
         this.member = member;
      }
   }

   apply( target: any, thisArg: any, args: any ): any {
      process.stdout.write( `calling: ${this.member.name}\n` );
      //console.log( t );
      //console.log( args );
      if ( this.member.jestFn === null ) {
         this.member.jestFn = jest.fn();
      }

      return this.member.jestFn.apply( this, args );
   }

   valueOf(): number {
      console.log( 'valueof' );
      return 555;
   }
}