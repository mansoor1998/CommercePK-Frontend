import {Print} from './print'

export class Book implements Print {
    getData(): any {
        throw new Error('Method not implemented.');
    }
    public name: string = '';
    public isbn: string = '';

    public getAttributes(): string[]{
        return ['name', 'isbn'];
    }
}