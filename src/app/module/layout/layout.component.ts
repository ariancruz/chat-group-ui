import { Component } from '@angular/core';
import {HeaderComponent} from './components/header/header.component';

@Component({
  selector: 'layout',
  imports: [
    HeaderComponent
  ],
  template: `
    <l-header/>

  `
})
export class LayoutComponent {

}
