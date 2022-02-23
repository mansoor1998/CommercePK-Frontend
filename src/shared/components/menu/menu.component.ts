// import { trigger, transition, style, animate, AnimationEvent, state } from '@angular/animations';
// import { DOCUMENT } from '@angular/common';
// import { ChangeDetectionStrategy } from '@angular/compiler/src/core';
// import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ContentChildren, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, QueryList, ViewChild } from '@angular/core';
import { appModuleAnimation } from 'src/shared/animations/routerTransition';



// class MenuItem {
//   public name: string = '';
//   // font awesome icon.
//   public iconClass: string = '';
//   public iconSize: string = '';
// }

// class ComponentFactory {
//   public static createComponentInstance<T>(component: Type<T>, injector: Injector): ComponentRef<T> {
//     const componentFactoryResolver = injector.get(ComponentFactoryResolver);
//     const applicationRef = injector.get(ApplicationRef);

//     // create a component reference
//     const componentRef = componentFactoryResolver.resolveComponentFactory(component)
//       .create(injector);

//     // attach component to the appRef so that so that it will be dirty checked.
//     applicationRef.attachView(componentRef.hostView);

//     return componentRef;
//   }
// }

// @Component({
//   selector: 'app-menu',
//   template: '',
//   styleUrls: ['./menu.component.css']
// })
// export class MenuComponent implements OnInit {

//   public menuOpen: boolean = false;
//   public componentRef: ComponentRef<MenuContentComponent> | undefined;
//   public componentHtml: HTMLElement | undefined;
//   public elementEvent: MouseEvent | undefined;

//   private offset = 30;

//   constructor(private element: ElementRef<HTMLElement>,
//     private ref: ChangeDetectorRef, private injector: Injector,
//     private renderer: Renderer2,
//     @Inject(DOCUMENT) private document: Document) { }

//   ngOnInit(): void {
//     this.componentRef = ComponentFactory.createComponentInstance<MenuContentComponent>(MenuContentComponent, this.injector);
//     // window.addEventListener('resize', () => {
//     //   if (this.elementEvent) {
//     //     this.componentHtml?.remove();
//     //     this.componentHtml = undefined;
//     //     this.elementEvent = undefined;
//     //     this.menuOpen = !this.menuOpen;
//     //   }
//     // });
//   }

//   toggle(event: MouseEvent) {
//     this.menuOpen = !this.menuOpen;

//     if (this.menuOpen) {
//       const elem = event.target as HTMLElement;
//       const pos = elem.getBoundingClientRect();
//       this.componentRef!.instance.posX = pos.left + window.scrollX;
//       this.componentRef!.instance.posY = pos.top + window.scrollY + this.offset;

//       const domElem = (this.componentRef!.hostView as EmbeddedViewRef<any>)
//         .rootNodes[0] as HTMLElement;
//       this.componentHtml = domElem;
//       this.renderer.appendChild(this.document.body, domElem);
//     } else {
//       if (this.componentHtml) {
//         this.componentHtml.remove();
//         this.componentHtml = undefined;
//         this.componentRef!.instance.posX = 0;
//         this.componentRef!.instance.posY = 0;
//       }
//     }

//     this.elementEvent = event;
//   }


//   ngAfterContentInit() {
//   }

//   ngOnDestroy() {
//     console.log('value is deleted');
//   }

// }


// @Component({
//   selector: 'menu-content',
//   template: `
//     <div class="menu-item rounded" [style]="{ 'position': 'absolute', 'top': posY + 'px', 'left': posX + 'px' }" [@routerTransition]>
//       <ul>
//         <li class="mb-2">
//           <span class="fas fa-tags me-2">
//           </span>
//           <span>Icons What</span>
//         </li>
//         <li class="mb-2">
//           <span class="fas fa-tags me-2">
//           </span>
//           <span>Icons What</span>
//         </li>
//         <li class="mb-2">
//           <span class="fas fa-tags me-2">
//           </span>
//           <span>Icons What</span>
//         </li>
//       </ul>
//       <div></div>
//     </div>
//   `,
//   styleUrls: ['./menu.component.css'],
//   animations: [
//     trigger('routerTransition', [
//       state('void', style({ 'margin-top': '20px', opacity: '0' })),
//       state('*', style({ 'margin-top': '0px', opacity: '1' })),
//       transition(':enter', [
//         animate('0.33s ease-out', style({ opacity: '1', 'padding-top': '0px' }))
//       ]),
//       transition(':leave', [
//         animate('0.33s ease-out', style({ opacity: '0', 'padding-top': '20px' }))
//       ]),
//     ])
//   ]
// })
// export class MenuContentComponent {
//   public posX: number = 0;
//   public posY: number = 0;

//   public menuItems: MenuItem[] = [];
// }



// @Directive({
//   selector: '[matMenuTriggerFor]',
//   host: {
//     'class': 'mat-menu-trigger',
//     '(click)': '_handleClick($event)'
//   }
// })
// export class MatmenuforDirective {

//   private _menuOpen: boolean = false;
//   private compElement: HTMLElement | undefined;

//   // @Input('matMenuTriggerFor')
//   // public menu: MenuComponent | undefined;
//   @Input('matMenuTriggerFor')
//   public menu: MenuComponent | undefined;

//   constructor(private element: ElementRef<HTMLElement>, private injector: Injector) { }

//   ngOnInit() {

//     const compRef = ComponentFactory.createComponentInstance<MenuComponent>(MenuComponent, this.injector);
//     const element = (compRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
//     this.compElement = element;
//     document.body.append(element);
//   }

//   /** Handles click events on the trigger. */
//   _handleClick(event: MouseEvent): void {
//     if (this._menuOpen) {
//       // this.menu?.onToggle.emit('close');
//       event.stopPropagation();
//     } else {
//       // this.menu?.onToggle.emit('open');
//     }

//     this._menuOpen = !this._menuOpen;
//   }

//   ngOnDestroy() {
//     this.compElement?.remove();
//   }

// }





@Component({
  selector: 'menu-list',
  template: `
    <li (click)="clicked.emit()">
      <span *ngIf="icon" [ngClass]="{ true : icon }"></span>
      <ng-content></ng-content>
    </li>
  `,
  // styleUrls: ['./menu.component.css'],
  animations: [appModuleAnimation()]
})
export class MenuListComponent {
  @Input('icon')
  public icon: string = ''

  public clicked: EventEmitter<void> = new EventEmitter<void>();
}


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [appModuleAnimation()]
})
export class MenuComponent implements OnInit {

  public isOpen: boolean = false;

  constructor(private ref: ChangeDetectorRef, private element: ElementRef) {

  }

  @ContentChildren(MenuListComponent)
  public list: QueryList<MenuListComponent> | undefined;

  @ContentChild('btn')
  public btn: ElementRef<HTMLElement> | undefined;

  ngOnInit() {
  }

  toggle(event: MouseEvent) {
    this.isOpen != this.isOpen;
    event?.stopPropagation();
  }

  ngAfterContentInit() {
    this.list?.forEach((item) => {
      item.clicked.subscribe(() => {
        this.isOpen = !this.isOpen;
        this.ref.markForCheck();
      });
    });

    console.log(this.btn);

    this.btn?.nativeElement.addEventListener("click", (() => {
      this.isOpen = !this.isOpen;
      this.ref.markForCheck();
    }).bind(this));

  }

  ngOnDestory() {
    this.list?.destroy();
  }

}