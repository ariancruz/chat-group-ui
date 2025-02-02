import {Component, input} from '@angular/core';
import {CommentDto} from '../../../../models';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'c-chat-item',
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
    <p>{{ data().data }}</p>
    <small>{{ data().createdAt | date: 'short' }}</small>
  `
})
export class ChatItemComponent {
  data = input.required<CommentDto>();
}
