import { Component } from "@angular/core";
import { ActivatedRoute, Data } from "@angular/router";
import { Print } from "./print";

@Component({
  selector: "app-generic",
  template: `
  <h1>This is the data of Generic component</h1>
  <table style="width: 500px;" *ngIf="data">
    <tr>
      <th *ngFor="let item of data?.getAttributes()"> {{item}} </th>
    </tr>
    <tr>
      <td style="text-align: center;" *ngFor="let item of data?.getData()">{{item}}</td>
    </tr>
  </table>
  `,
  styles: [``]
})
export class GenericComponent<T extends Print> {
   //@ts-ignore
   private classType: new () => T;
    public data: T | null = null;

  constructor(private route: ActivatedRoute){
  }

  ngOnInit(){
      this.route.data.subscribe((res) => {
        this.classType = res.Class;
        this.data = new this.classType(); 
      });
  }
}
