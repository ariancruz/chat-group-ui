import {Component, DestroyRef, inject, signal} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {AuthHttpService} from '../../http/auth.http.service';
import {CreateUser} from '../../models';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';
import {mistMach} from './validators/mistMach';
import {MatDivider} from '@angular/material/divider';

@Component({
  selector: 'p-register',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    MatDivider,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  hide = signal<boolean>(true);
  form = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', Validators.required),
    confirmPassword: new FormControl<string>('', Validators.required),
  }, {validators: mistMach});

  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef)
  private readonly authService = inject(AuthHttpService)


  register(): void {
    this.authService.register(this.form.value as CreateUser).pipe(
      takeUntilDestroyed(this.destroyRef),
      map(() => this.router.navigate(['auth']))
    ).subscribe()
  }

  changeState($event: Event): void {
    this.hide.set(!this.hide());
    $event.stopPropagation();
  }
}
