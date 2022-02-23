import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { slideFromBottom } from 'src/shared/animations/routerTransition';
import { SideBarService } from 'src/shared/sidebar';
import { SidebarNavComponent } from '../sidebar-nav/sidebar-nav.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [slideFromBottom()]
})
export class HeaderComponent implements OnInit {

  public toggleCart = false;

  @ViewChild('cartIcon') public cartIcon: ElementRef | undefined;

  public counter = [0, 0, 0, 0];

  toggle: boolean = true;
  thememode: "dark" | "light" = "dark";
  constructor(private toggelService: SideBarService) { }

  ngOnInit(): void {
    this.toggelService.toggleSidebar(this.toggle);
    this.toggelService.currentValue.subscribe((val) => this.toggle = val);
  }

  closeCart() {
    // console.log('close cart called.');
    // if (!this.cartIcon?.nativeElement.contains(target)) {
    this.toggleCart = false;
    // }
  }


  toggleSidebar(value?: boolean) {
    this.toggelService.toggleSidebar((value) ? value : !this.toggle);
  }

  changeThememode(event: any) {
    const app = document.getElementById('app');
    if (app?.classList.contains('dark-layout')) {
      app.classList.remove('dark-layout');
      app.classList.add('light-layout');
      this.thememode = "light";
      return
    }

    app?.classList.remove('light-layout');
    app?.classList.add('dark-layout');
    this.thememode = "dark";
  }

  setCounter(index: number, type: string) {
    if (type == "increment") {
      this.counter[index]++;
    } else {
      this.counter[index]--;
    }
  }
}


