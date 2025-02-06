import {Component, effect, inject, viewChildren} from '@angular/core';
import {MessagesService} from '../../../../services/messages.service';
import {ChatItemComponent} from './chat-item.component';
import {MsgTypePipe} from '../../pipes/msg-type.pipe';
import {SocketService} from '../../../../services/socket.service';
import {EventsWs} from '../../../../enums';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {switchMap, tap} from 'rxjs';
import {CommentDto} from '../../../../models';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'c-chat-list',
  imports: [
    ChatItemComponent,
    MsgTypePipe,
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
      <c-chat-item [data]="msg" [class]="msg | msgType" [attr.id]="msg._id" #comment/>
    }
  `
})
export class ChatListComponent {
  readonly socket = inject(SocketService);
  readonly message = inject(MessagesService)
  readonly activatedRoute = inject(ActivatedRoute)

  comments = viewChildren<ChatItemComponent>(ChatItemComponent);

  constructor() {
    this.activatedRoute.params.pipe(
      takeUntilDestroyed(),
      switchMap(({id}) => this.socket.on(id + ':' + EventsWs.NEW_COMMENT)),
      tap((msg: CommentDto) => this.message.addMsg(msg))
    ).subscribe()

    effect(() => {
      const last = this.comments().at(-1)

      if (last) {
        last.el.nativeElement.scrollIntoView({behavior: 'smooth'})
      }
    })
  }
}
