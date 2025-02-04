import {Component} from '@angular/core';
import {ChatListComponent} from './components/chat-list/chat-list.component';
import {TextInputComponent} from './components/text-input/text-input.component';
import {IaLoaderComponent} from './components/ia-loader/ia-loader.component';

@Component({
  selector: 'p-chat',
  imports: [
    ChatListComponent,
    TextInputComponent,
    IaLoaderComponent
  ],
  templateUrl: './chat.component.html'
})
export class ChatComponent {
}
