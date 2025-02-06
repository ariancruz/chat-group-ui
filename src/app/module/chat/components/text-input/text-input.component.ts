import {Component, inject, model} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MessagesService} from '../../../../services/messages.service';
import {GeminiDirective} from '../../directives/gemini.directive';
import {ActivatedRoute} from '@angular/router';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {tap} from 'rxjs';
import {NgTemplateOutlet} from '@angular/common';

@Component({
  selector: 'c-text-input',
  imports: [
    FormsModule,
    MatIcon,
    MatIconButton,
    GeminiDirective,
    NgTemplateOutlet,
  ],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss',
})
export class TextInputComponent {

  value = model<string>('');
  showIcon = model<boolean>(false);

  private readonly message = inject(MessagesService);
  private readonly activatedRoute = inject(ActivatedRoute);

  constructor() {
    this.activatedRoute.params.pipe(
      takeUntilDestroyed(),
      tap(() => this.clear())
    ).subscribe()
  }

  send(): void {
    this.message.send(this.value(), this.showIcon());
    this.clear();
  }

  showIa($event: boolean): void {
    this.showIcon.set($event);
  }

  private clear(): void {
    this.value.set('');
    this.showIcon.set(false);
  }
}
