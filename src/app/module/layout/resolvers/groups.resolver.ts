import {ResolveFn} from '@angular/router';
import {inject} from '@angular/core';
import {GroupsService} from '../../../services/groups.service';

export const groupsResolver: ResolveFn<any> = (route) => {
  const groups = inject(GroupsService);

  const {params} = route;
  const {id} = params;

  return groups.loadAll(id)
}
