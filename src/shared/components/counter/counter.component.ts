import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {
  @Input()
  public counter: number = 0;

  @Output() onChange = new EventEmitter<string>()
  constructor() { }

  onclick(type: "increment" | "decrement") {
    this.onChange.emit(type);
  }

  ngOnInit(): void {
  }

}
