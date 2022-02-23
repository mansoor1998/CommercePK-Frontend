import { ElementSchemaRegistry } from '@angular/compiler';
import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[matMenuTriggerFor]',
  host: {
    'class': 'mat-menu-trigger',
    '(click)': '_handleClick($event)'
  }
})
export class MatmenuforDirective {

  private _menuOpen: boolean = false
  private _menu: HTMLElement | undefined;

  constructor() { }

  @Input('matMenuTriggerFor')
  get menu(): HTMLElement {
    return this._menu as HTMLElement;
  }
  set menu(menu: HTMLElement) {
    if (menu === this._menu) {
      return;
    }

    this._menu = menu;
  }

  ngOnInit() {
    console.log(this.menu)
    if (!this._menuOpen) {
      //@ts-ignore
      // this._menu?.style.display = 'none';
      this._menuOpen = !this._menuOpen;
      this._menu?.remove();
    }
  }

  /** Handles click events on the trigger. */
  _handleClick(event: MouseEvent): void {
    if (this._menuOpen) {
      // Stop event propagation to avoid closing the parent menu.
      console.log('blocks');
      //@ts-ignore
      document.body.append(this.menu);
    } else {
      //@ts-ignore
      // this._menu?.style.display = 'none';
      this.menu.remove();
    }

    this._menuOpen = !this._menuOpen;
  }

}
