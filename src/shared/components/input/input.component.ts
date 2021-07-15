import { AfterContentInit, AfterViewInit, ChangeDetectionStrategy, Component, ContentChild, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';


@Component({
  selector: 'input-error',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="input-error">
      <ng-content></ng-content>
    </span>
  `
})
export class InputErrorComponenet {}


@Component({
  selector: 'app-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
      <div class="custom-input">
          <!--Content will be projected here-->
          <ng-container #input>
            <ng-content select="input"></ng-content>
          </ng-container>
          <span class="input-icon">
            <ng-content></ng-content>
          </span>
      </div>
      <ng-content *ngIf="showError" select="input-error"></ng-content>
  `
})
export class InputComponent implements /* OnInit , AfterViewInit*/ OnChanges {

  // @ViewChild('icon') icon: ElementRef | undefined;
  @ViewChild('input', { read: ElementRef }) input: ElementRef | undefined;
  // afterInit: boolean = false;

  @Input() showError: boolean = false;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.setInputBorder();
  }

  public setInputBorder(){
    if(this.input)
      this.input.nativeElement.previousSibling.style.borderColor = (this.showError) ?  '#dc3545' : null;
  }

  // ngAfterViewInit(): void {
  //   if ( this.icon ){
  //     (this.input) ? this.input.nativeElement.previousSibling.style.paddingLeft = `${this.icon.nativeElement.offsetWidth + 20}px` : null;
  //   }
  //   this.setInputBorder();
  //   this.afterInit = true;
  // }

}
