import {inject, Pipe, PipeTransform} from '@angular/core';
import {CommentDto} from '../../../models';
import {SessionService} from '../../../services/session.service';

@Pipe({
  name: 'msgType'
})
export class MsgTypePipe implements PipeTransform {

  service = inject(SessionService)

  transform(value: CommentDto): string {
    const {users} = value;
    return users === this.service.userId() ? 'req' : 'res';
  }

}
