import {Component, inject, output} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {SessionService} from '../../../../services/session.service';
import {Router} from '@angular/router';

@Component({
  selector: 'l-header',
  imports: [
    MatToolbar,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  chaneDraw = output<void>();

  private readonly session = inject(SessionService);
  private readonly router = inject(Router);

  logout(): void {
    this.session.logout();
    this.router.navigate(['auth']).then()
  }

}
