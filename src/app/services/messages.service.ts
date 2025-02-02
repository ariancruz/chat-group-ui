import {inject, Injectable, signal} from '@angular/core';
import {CommentDto} from '../models';
import {CommentHttpService} from '../http/comment.http.service';
import {tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  messagesList = signal<CommentDto[]>([])

  private commentHttpService = inject(CommentHttpService);

  loadAll(id: string) {
    return this.commentHttpService.findAll(id).pipe(
      tap(list => this.messagesList.set(list))
    )
  }

  send(message: string): void {
    //this.http.post(``, {})
  }
}
