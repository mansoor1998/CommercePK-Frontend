import {Interface, Print} from './print'

export class Person extends Interface implements Print {
    
    public id: string = 'first value'
    public name: string = 'second value';
    public age: number = 10;
  
    // constructor(){
    //   super();
    //   console.log('i have added a constructor');
    // }

    // public getAttributes(): any[] {
    //     return Object.keys(this).map(x => x.toLocaleUpperCase());
    // }

    // public getData(): [] {
    //     return Object.values(this).filter(x => x !== Object(x)) as [];
    // }
}
