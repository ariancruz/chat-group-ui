import {Component} from '@angular/core';
import {HeaderComponent} from './components/header/header.component';
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from '@angular/material/sidenav';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'layout',
  imports: [
    HeaderComponent,
    MatDrawer,
    MatDrawerContainer,
    MatDrawerContent,
    RouterOutlet
  ],
  styles: `
    :host {
      height: 100%;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;

    }
  `,
  template: `
    <l-header (chaneDraw)="drawer.toggle()"/>
    <mat-drawer-container [hasBackdrop]="false" class="flex-auto" [autosize]="true">
      <mat-drawer #drawer mode="side" [opened]="true">
        <router-outlet name="sidebar"/>
      </mat-drawer>
      <mat-drawer-content class="border-round-top-2xl bg-white">
        <router-outlet/>
      </mat-drawer-content>
    </mat-drawer-container>
  `
})
export class LayoutComponent {
}
