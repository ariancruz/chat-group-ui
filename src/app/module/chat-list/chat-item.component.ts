import {Component, input} from '@angular/core';
import {Message} from '../../models';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'chat-item',
  imports: [
    DatePipe
  ],
  styles: `
    :host {

      margin-bottom: 1.5rem;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      &.req {
        justify-self: flex-end;
        padding: 10px;
        background-color: #e0e0e0;
        width: fit-content;
        border-radius: 10px 0 10px 10px;
      }

      &.res {
        justify-self: flex-start;
      }

      small {
        font-weight: 300;
        font-size: 0.65rem;
        text-align: right;
        width: 100%;
        color: gray;
      }

      p {
        margin: .25rem;
      }
    }
  `,
  template: `
      <p>{{data().text}}</p>
      <small>{{data().date | date: 'short'}}</small>

  `
})
export class ChatItemComponent {
  data = input.required<Message>();
}
