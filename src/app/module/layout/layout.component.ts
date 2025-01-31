import {Component, viewChild} from '@angular/core';
import {HeaderComponent} from './components/header/header.component';
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from '@angular/material/sidenav';
import {SideComponent} from './components/side/side.component';
import {RouterOutlet} from '@angular/router';

@Component({
    selector: 'layout',
    imports: [
        HeaderComponent,
        MatDrawer,
        MatDrawerContainer,
        MatDrawerContent,
        SideComponent,
        RouterOutlet
    ],
  styles: `
    :host {
      height: 100%;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;

      mat-drawer-container {
        flex: 1 1 auto;
      }
    }
  `,
    template: `
        <l-header (chaneDraw)="openClose()"/>
        <mat-drawer-container [hasBackdrop]="false">
            <mat-drawer #drawer mode="push">
                <l-side/>
                sdfdsfsdf
            </mat-drawer>
            <mat-drawer-content>
                <router-outlet/>
            </mat-drawer-content>
        </mat-drawer-container>
    `
})
export class LayoutComponent {
    draw = viewChild<MatDrawer>(MatDrawer);

    openClose(): void {
        console.log(this.draw())
        if (this.draw()?.opened) {
            this.draw()?.close()
        } else {
            this.draw()?.open()
        }
    }
}
