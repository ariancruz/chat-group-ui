import {Component, inject} from '@angular/core';
import {MessagesService} from '../../../../services/messages.service';
import {ChatItemComponent} from './chat-item.component';
import {MsgTypePipe} from '../../pipes/msg-type.pipe';

@Component({
  selector: 'c-chat-list',
  imports: [
    ChatItemComponent,
    MsgTypePipe
  ],
  styles: `
    :host {
      overflow-y: auto;
      width: auto;
      padding-left: 5rem;
      padding-right: 5rem;

      &:first-child {
        margin-top: 5rem;
      }
    }
  `,
  template: `
    @for (msg of message.messagesList(); track i; let i = $index) {
      <c-chat-item [data]="msg" [class]="msg | msgType"/>
    }

  `
})
export class ChatListComponent {

  readonly message = inject(MessagesService)
}
