import {NgModule} from '@angular/core';
import {provideRouter, Routes} from '@angular/router';
import {LayoutComponent} from './layout.component';

const routes: Routes = [{
  path: '', component: LayoutComponent, children: [
    {
      path: '',
      loadComponent: () => import('../chat/chat.component').then(c => c.ChatComponent)
    },
    {
      path: '', outlet: 'sidebar',
      loadComponent: () => import('./components/side-bar/side-bar.component').then(c => c.SideBarComponent)
    },
  ]
}];

@NgModule({
  providers: [
    provideRouter(routes),
  ]
})
export class LayoutModule {
}
