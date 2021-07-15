import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent, InputErrorComponenet } from './components/input/input.component';
import { ChipComponent, ChipsComponent } from './components/chips/chips.component';

@NgModule({
  declarations: [
    InputComponent,
    InputErrorComponenet,
    ChipsComponent,
    ChipComponent
  ],
  imports: [
    CommonModule,
  ],
  entryComponents: [
  ],
  exports: [
    InputComponent,
    InputErrorComponenet,
    ChipsComponent,
    ChipComponent
  ]
})
export class ShareModule { }