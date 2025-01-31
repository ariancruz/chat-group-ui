import {Injectable, linkedSignal, signal} from '@angular/core';
import {UserAuthenticated} from '../models';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  token = signal<string | null>(null)
  user = signal<UserAuthenticated | null>(null)

  readonly isLoggedIn = linkedSignal(() => !!this.user())

  logout(): void {
    localStorage.clear();
    this.token.set(null)
    this.user.set(null)
  }

  setUserLogged(data: UserAuthenticated): void {
    const {accessToken, refreshToken} = data;

    this.user = signal(data)
    if (accessToken) {
      this.token = signal(accessToken)
      localStorage.setItem('access', accessToken);
    }
    if (refreshToken) {
      localStorage.setItem('refresh', refreshToken);
    }
  }


  setToken(token: string): void {
    this.token.set(token);
    this.isLoggedIn.set(true);
  }
}
