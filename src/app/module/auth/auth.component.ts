import {Component, DestroyRef, inject, signal} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {AuthService} from '../../services/auth.service';
import {FormAuth} from '../../models';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {tap} from 'rxjs';
import {SessionService} from '../../services/session.service';
import {RouterLink} from '@angular/router';
import {MatDivider} from '@angular/material/divider';

@Component({
  selector: 'p-auth',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    MatDivider
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

  hide = signal<boolean>(true);
  form = new FormGroup({
    password: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
  });

  private readonly destroyRef = inject(DestroyRef)
  private readonly authService = inject(AuthService)
  private readonly sessionService = inject(SessionService)


  login(): void {
    this.authService.login(this.form.value as FormAuth).pipe(
      takeUntilDestroyed(this.destroyRef),
      tap(data => this.sessionService.setUserLogged(data)),
    ).subscribe()
  }

  changeState($event: Event): void {
    this.hide.set(!this.hide());
    $event.stopPropagation();
  }
}
