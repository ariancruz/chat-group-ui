import {Component, inject, model} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MessagesService} from '../../../../services/messages.service';

@Component({
  selector: 'text-input',
  imports: [
    FormsModule,
    MatIcon,
    MatIconButton,
  ],
  styles:`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      padding-bottom: 15px;

      textarea {
        width: 70%;
        field-sizing: content;
        padding: 15px 20px;
        border-radius: 999px;
        resize: none;

        &:focus {
          outline: 0;
        }
      }

      button {
        position: relative;
        right: 3rem;
        &:hover, &:focus {
          color: var(--mat-sys-primary);
          transform: rotate(-45deg);
        }
      }

    }

  `,
  template: `
    <textarea [(ngModel)]="value" (keyup.enter)="send()"></textarea>
    <button mat-icon-button (click)="send()">
      <mat-icon>send</mat-icon>
    </button>
  `,
})
export class TextInputComponent {

  value = model<string>('');

  private readonly message = inject(MessagesService)

  send(): void {
    this.message.send(this.value());
    this.value.set('')
  }
}
