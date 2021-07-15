export class MenuItem {
    // public variables
    name = '';
    // permissionName = [];
    icon = '';
    route = '';
    items: MenuItem[] | null = null;

    private selected: boolean = false;

    set Selected(value: boolean){
        this.selected = value;
    }

    get Selected(){
        return this.selected
    }

    isChildEmpty(): boolean{
        return (this.items == null || this.items?.length === 0);
    }

    isChildAvailable(item: MenuItem): boolean {
        if(this.isChildEmpty())  return false;
        return (this.items?.findIndex(x => item === x) != -1) ? true : false;
    }

    isChildSelected(): boolean {
        if(this.isChildEmpty())  return false;
        return (this.items?.findIndex(x => x.Selected) != -1) ? true : false;
    }

    constructor(name: string, icon: string, route: string, childItems: MenuItem[] | null = null) {
        this.name = name;
        this.icon = icon;
        this.route = route;
        this.items = childItems;
    }
}