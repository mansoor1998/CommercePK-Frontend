import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnInit {

  public show = false;
  
  public chips = [ { name: 'mansoor' }, { name: 'saad' }, { name: 'mansoor' }, { name: 'hamza' }, { name: 'mansoor' } ];

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    setTimeout( () => { this.show = true; console.log('show is true'); this.cd.markForCheck() }, 2000 );
  }

  public add(value: string) {
    this.chips.push({ name: value });
  }

  public remove(item: any){
    let index = this.chips.findIndex(x => x === item);
    this.chips.splice(index, 1);
  }


}
