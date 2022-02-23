
export enum STATUS {
    DRAFT = 'DRAFT',
    ACTIVE = 'ACTIVE',
    ARCHIVE = 'ARCHIVE'
}

export class Product {
    public id: string = '';
    public title: string = '';
    public status: STATUS | undefined;
    public inventory: number = 0;
    public type: string = '';
    public vendor: string = '';
    public imgUrl: string = '';
    public selected: boolean = false;
}