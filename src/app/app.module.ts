import { ApplicationRef, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GenericComponent } from './generic.component';
import { SidebarNavComponent } from './layout/sidebar-nav/sidebar-nav.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './layout/header/header.component';
// import { ReactiveFormsModule } from '@angular/forms';
import { ShareModule } from 'src/shared/share.module';

  

@NgModule({
  declarations: [
    AppComponent,
    GenericComponent,
    SidebarNavComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ShareModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(applicationRef: ApplicationRef){
    // const originalTick = applicationRef.tick;

    // applicationRef.tick = function(){
    //   const windowPerformance = window.performance;
    //   const before = windowPerformance.now();
    //   const retValue = originalTick.call(this);
    //   const after = windowPerformance.now();
    //   const runTime = after - before
    //   console.log('Change detection run time : ' , runTime);
    //   return retValue;
    // }
  }
}
