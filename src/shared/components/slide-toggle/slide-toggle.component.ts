import { Component, ComponentFactoryResolver, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-slide-toggle',
  template: `
    <input type="checkbox" class="switch" [value]="val" (change)="eventChecked($event)" />
  `,
  styles: [
    `
    input[type="checkbox"] {
      --checkbox-width: 46px;
      --checkbox-height: 23px;
      --checkbox-button-size: 22px;
    }
  
    input[type="checkbox"].switch{
      font-size: 30px;
      -webkit-appearance: none;
        -moz-appearance: none;
              appearance: none;
      width: var(--checkbox-width);
      height: var(--checkbox-height);
      background: #ddd;
      border-radius: 3em;
      position: relative;
      cursor: pointer;
      outline: none;
      -webkit-transition: all .2s ease-in-out;
      transition: all .2s ease-in-out;
    }
    
    input[type="checkbox"].switch:checked{
      background: #0ebeff;
      background: var(--props-color-2);
    }
    
    input[type="checkbox"].switch:after{
      position: absolute;
      content: "";
      width: var(--checkbox-button-size);
      height: var(--checkbox-button-size);
      border-radius: 50%;
      background: #fff;
      -webkit-box-shadow: 0 0 .25em rgba(0,0,0,.3);
              box-shadow: 0 0 .25em rgba(0,0,0,.3);
      -webkit-transform: scale(.7);
              transform: scale(.7);
      left: 0;
      -webkit-transition: all .2s ease-in-out;
      transition: all .2s ease-in-out;
    }
    
    input[type="checkbox"].switch:checked:after{
      left: calc(100% - 1.5em);
      left: calc(100% - var(--checkbox-button-size))
    }
    `
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SlideToggleComponent),
      multi: true
    }
  ]
})
export class SlideToggleComponent implements ControlValueAccessor {

  constructor() { }

  onChange: any = () => { }
  onTouch: any = () => { }
  public val: boolean = false; // this is the updated value that the class accesses

  public eventChecked(e: Event) {
    //@ts-ignore
    const val = e.target?.checked;
    if (val !== undefined && this.val !== val) {
      this.val = val
      this.onChange(val)
      this.onTouch(val)
    }
  }

  writeValue(value: boolean): void {
    this.val = value;
  }

  // upon ui element value changes.
  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  // upon touching the element.
  registerOnTouched(fn: any): void {
    this.onTouch = fn
  }
}
