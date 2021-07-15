export interface Print {
    getAttributes(): any[];

    getData(): [];
}

export class Interface {
    public getAttributes(): any[] {
        return Object.keys(this).map(x => x.toLocaleUpperCase());
    }

    public getData(): [] {
        return Object.values(this).filter(x => x !== Object(x)) as [];
    }
} 