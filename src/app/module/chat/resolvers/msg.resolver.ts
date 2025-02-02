import {ResolveFn} from '@angular/router';
import {inject} from '@angular/core';
import {MessagesService} from '../../../services/messages.service';

export const msgResolver: ResolveFn<any> = (route) => {
  const msg = inject(MessagesService);

  const {params} = route;
  const {id} = params;

  return msg.loadAll(id)
}
