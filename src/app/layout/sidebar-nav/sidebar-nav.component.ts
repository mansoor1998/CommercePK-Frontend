import { animate, group, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'src/shared/layout/MenuItem';

@Component({
  selector: 'app-sidebar-nav',
  templateUrl: './sidebar-nav.component.html',
  styleUrls: ['./sidebar-nav.component.css'],
  animations: [
    trigger('openClose', [
      // state('in', style({ 'height': '0' })),
      state('closed', style({ 'height': '0' })),
      state('open', style({ 'height': '*' })),
      transition('open <=> closed', [
        animate('300ms ease-out')
      ]),

      // transition('open => closed', [
      //   animate('200ms ease-out')
      // ]), 
    ])
  ]
})
export class SidebarNavComponent implements OnInit {

  

  menuItems: MenuItem[] = [
    new MenuItem('Products', 'fas fa-tags', '', [
      new MenuItem('All Products', 'far fa-dot-circle', '/admin/products', null),
      new MenuItem('Create', 'far fa-dot-circle', '/admin/products/new', null),
      new MenuItem('Inventory', 'far fa-dot-circle', '/admin/products/inventory', null),
      new MenuItem('Transfers', 'far fa-dot-circle', '', null),
    ]),
    new MenuItem('Link', 'fas fa-smile', '/', null)
  ]


  private parentChildSelected = false;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    
    const pathname = window.location.pathname;

    //@ts-ignore
    // this.menuItems[0].items[0].Selected = true;

    for(let item of this.menuItems){
      if(item.items == null && item.route === pathname) {
        this.toggleItem(item);
        break;
      }

      else if(item.items != null) {
        for(let subItem of item.items){
          if(subItem.items == null && subItem.route === pathname) {
            item.Selected = true;
            this.toggleItem(subItem);
            break;
          }
        }
      }
    }
  }

  toggleItem(item: MenuItem){

    

    if(!item.isChildEmpty()) {
      item.Selected = !item.Selected;
      // for(let menuItem of this.menuItems.filter(x => !x.isChildEmpty())){
      //   if(menuItem !== item){
      //     menuItem.Selected = false;
      //   }
      // }
      return;
    }
    else item.Selected = true;

    for(let menuItem of this.menuItems){
      let childItems = menuItem.items ? menuItem.items : []; 
      for(let childItem of childItems){
          if(item === childItem || this.parentChildSelected) {
            continue;
          }
          childItem.Selected = false;
      }

      // eithre the parent item matches the orignal item.
      // or the child child item belongs to that parent.
      // then continue and dont set its value false becuase it has already been set true.
      if(menuItem === item || menuItem.isChildAvailable(item)) continue;
      
      menuItem.Selected = false;
    }

  }

}
