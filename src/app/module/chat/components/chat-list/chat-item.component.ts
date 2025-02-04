import {Component, ElementRef, inject, input} from '@angular/core';
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

        &:first-child{
          text-align: start;
          margin-bottom: 5px;
          font-weight: 700;
          font-size: .8rem;
        }
      }

      p {
        margin: .25rem .25rem .25rem 1rem;
      }
    }
  `,
  template: `
    <small>{{data().name}}</small>
    @if (data().name === 'Gemini') {
      <p [innerText]="data().data"></p>
    } @else {
      <p>{{ data().data }}</p>
    }
    <small>{{ data().createdAt | date: 'short' }}</small>
  `
})
export class ChatItemComponent {
  data = input.required<CommentDto>();

  readonly el = inject(ElementRef<ChatItemComponent>);
}
