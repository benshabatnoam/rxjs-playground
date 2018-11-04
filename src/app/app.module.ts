import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopNavbarComponent } from './layout/components/top-navbar/top-navbar.component';
import { TopNavbarLayoutComponent } from './layout/app-layouts/top-navbar-layout/top-navbar-layout.component';
import { DragNDropComponent } from './components/drag-n-drop/drag-n-drop.component';

@NgModule({
  declarations: [
    AppComponent,
    TopNavbarComponent,
    TopNavbarLayoutComponent,
    DragNDropComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
