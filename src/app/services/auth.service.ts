import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormAuth, UserAuthenticated} from '../models';
import {buildURL} from '../utils';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly httpClient = inject(HttpClient);

  login(data: FormAuth): Observable<UserAuthenticated> {
    return this.httpClient.post<UserAuthenticated>(buildURL('/api/login'), data)
  }
}
