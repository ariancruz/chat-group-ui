import {NgModule} from '@angular/core';
import {provideRouter, Routes} from '@angular/router';
import {LayoutComponent} from './layout.component';
import {groupsResolver} from './resolvers/groups.resolver';
import {msgResolver} from '../chat/resolvers/msg.resolver';

const routes: Routes = [{
  path: '',
  resolve: {groups: groupsResolver},
  component: LayoutComponent, children: [
    {
      path: ':id',
      resolve: {msg: msgResolver},
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
