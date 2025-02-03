import {inject, Injectable} from '@angular/core';
import {buildURL} from '../utils';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserLight} from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserHttpService {

  private readonly url = buildURL('/api/user')
  private readonly httpClient = inject(HttpClient);

  findAll(): Observable<UserLight[]> {
    return this.httpClient.get<UserLight[]>(this.url);
  }
}
