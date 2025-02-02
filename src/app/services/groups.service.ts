import {inject, Injectable, signal} from '@angular/core';
import {GroupsHttpService} from '../http/groups.http.service';
import {tap} from 'rxjs';
import {GroupsLightTO} from '../models';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  groupList = signal<GroupsLightTO[]>([]);
  selected = signal<GroupsLightTO | undefined>(undefined)


  private groupsHttpService = inject(GroupsHttpService);

  loadAll(id?: string) {
    return this.groupsHttpService.findAll().pipe(
      tap(list => {
        this.groupList = signal(list);

        if (id) {
          const group = list.find(f => f._id === id);
          this.selected.set(group)
        }
      })
    )
  }
}
