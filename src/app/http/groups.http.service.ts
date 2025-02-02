import {inject, Injectable} from '@angular/core';
import {buildURL} from '../utils';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CreateGroup, GroupsLightTO, GroupTO} from '../models';

@Injectable({
  providedIn: 'root'
})
export class GroupsHttpService {

  private readonly url = buildURL('/api/groups')
  private readonly httpClient = inject(HttpClient);

  findAll(): Observable<GroupsLightTO[]> {
    return this.httpClient.get<GroupsLightTO[]>(this.url);
  }

  findById(id: string): Observable<GroupTO> {
    return this.httpClient.get<GroupTO>(`${this.url}/${id}`)
  }

  create(data: CreateGroup): Observable<GroupTO> {
    return this.httpClient.post<GroupTO>(this.url, data)
  }

  update(data: GroupTO): Observable<any> {
    const {_id, ...update} = data;
    return this.httpClient.patch(`${this.url}/${_id}`, update)
  }

  destroy(id: string): Observable<any> {
    return this.httpClient.delete(`${this.url}/${id}`)
  }
}
