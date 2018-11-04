import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TopNavbarLayoutComponent } from './layout/app-layouts/top-navbar-layout/top-navbar-layout.component';
import { DragNDropComponent } from './components/drag-n-drop/drag-n-drop.component';

const routes: Routes = [
  {
    path: '',
    component: TopNavbarLayoutComponent,
    children: [
      {
        path: 'drag-n-drop',
        component: DragNDropComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
