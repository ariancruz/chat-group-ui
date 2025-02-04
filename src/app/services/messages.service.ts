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
    const ia = data.startsWith('@gemini')
    if (ia) {
      data = data.slice(7).trim()
    }
    this.commentHttpService.create({group: this.groupSelect(), data, ia}).subscribe()
  }

  addMsg(msg: CommentDto): void {
    this.messagesList.set(
      this.messagesList().concat(msg)
    );
  }
}
