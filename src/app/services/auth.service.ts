import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CreateUser, FormAuth, RefreshTokenTO, UserAuthenticated} from '../models';
import {buildURL} from '../utils';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly url =  buildURL('/api/auth')
  private readonly httpClient = inject(HttpClient);

  login(data: FormAuth): Observable<UserAuthenticated> {
    return this.httpClient.post<UserAuthenticated>(`${this.url}/login`, data)
  }

  register(data: CreateUser): Observable<UserAuthenticated> {
    return this.httpClient.post<UserAuthenticated>(`${this.url}/register`, data)
  }

  profile(): Observable<UserAuthenticated> {
    return this.httpClient.get<UserAuthenticated>(`${this.url}/profile`)
  }

  refreshToken(refreshToken: string): Observable<RefreshTokenTO> {
    return this.httpClient.put<RefreshTokenTO>(`${this.url}/refresh`, {refreshToken})
  }
}
