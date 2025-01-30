import { Component } from '@angular/core';
import {ChatListComponent} from '../chat-list/chat-list.component';
import {TextInputComponent} from '../text-input/text-input.component';
import {ChatUsersComponent} from '../chat-users/chat-users.component';

@Component({
  selector: 'app-chat',
  imports: [
    ChatListComponent,
    TextInputComponent,
    ChatUsersComponent
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {

}
