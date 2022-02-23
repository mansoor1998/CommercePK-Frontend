import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class SideBarService {
    private toggle = new BehaviorSubject<boolean>(true);
    public currentValue = this.toggle.asObservable();

    public toggleSidebar(value: boolean): void {
        this.toggle.next(value);
    }
}
