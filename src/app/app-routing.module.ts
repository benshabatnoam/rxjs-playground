import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TopNavbarLayoutComponent } from './layout/app-layouts/top-navbar-layout/top-navbar-layout.component';
import { DragNDropComponent } from './components/drag-n-drop/drag-n-drop.component';
import { PingPongComponent } from './components/ping-pong/ping-pong.component';

const routes: Routes = [
  {
    path: '',
    component: TopNavbarLayoutComponent,
    children: [
      {
        path: 'drag-n-drop',
        component: DragNDropComponent
      },
      {
        path: 'ping-pong',
        component: PingPongComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
