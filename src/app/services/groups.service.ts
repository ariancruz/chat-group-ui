import {inject, Injectable, signal} from '@angular/core';
import {GroupsHttpService} from '../http/groups.http.service';
import {switchMap, tap} from 'rxjs';
import {GroupsLightTO, GroupTO} from '../models';
import {toObservable} from '@angular/core/rxjs-interop';
import {filter} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  groupList = signal<GroupsLightTO[]>([]);
  selected = signal<GroupsLightTO | undefined>(undefined)
  private groupsHttpService = inject(GroupsHttpService);

  group = toObservable(this.selected).pipe(
    filter(f => !!f),
    switchMap(({_id}) => this.groupsHttpService.findById(_id))
  )

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

  create(data: GroupTO) {
    this.groupsHttpService.create(data).pipe(
      tap(group => {
        const {_id, name} = group;
        this.addGroup({_id, name})
      })
    ).subscribe()
  }

  update(data: GroupTO): void {
    this.groupsHttpService.update(data).pipe(
      tap(() => {
        const {name, _id} = data
        this.updateGroup({_id, name})
      })
    ).subscribe()
  }

  delete(id: string): void {
    this.groupsHttpService.destroy(id).pipe(
      tap(() => {
        this.groupList.set(
          this.groupList().filter(g => g._id !== id)
        );
      })
    ).subscribe()
  }

  addGroup(group: GroupsLightTO): void {
    this.groupList.set(this.groupList().concat(group));
  }

  updateGroup(group: GroupsLightTO): void {
    this.groupList.set(
      this.groupList().map(g => g._id === group._id ? group : g)
    );
  }

  setSelected(selected: GroupsLightTO): void {
    this.selected.set(selected);
  }

  findById(id: string) {
    return this.groupsHttpService.findById(id);
  }


  removedGroup(group: Partial<GroupsLightTO>): void {
    const {_id} = group;

    this.groupList.set(
      this.groupList().filter(g => g._id !== _id)
    );
  }
}
