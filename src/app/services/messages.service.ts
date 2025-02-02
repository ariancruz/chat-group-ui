import {inject, Injectable, signal} from '@angular/core';
import {CommentDto} from '../models';
import {CommentHttpService} from '../http/comment.http.service';
import {tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  groupSelect = signal('')
  messagesList = signal<CommentDto[]>([])

  private commentHttpService = inject(CommentHttpService);

  loadAll(id: string) {
    this.groupSelect.set(id);
    return this.commentHttpService.findAll(id).pipe(
      tap(list => this.messagesList.set(list))
    )
  }

  send(data: string): void {
    this.commentHttpService.create({group: this.groupSelect(), data}).pipe(
      tap(msg => this.messagesList.update(list => list.concat(msg)))
    ).subscribe()
  }
}
