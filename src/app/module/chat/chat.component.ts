import {Component} from '@angular/core';
import {ChatListComponent} from './components/chat-list/chat-list.component';
import {TextInputComponent} from './components/text-input/text-input.component';

@Component({
  selector: 'app-chat',
  imports: [
    ChatListComponent,
    TextInputComponent
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {

}
