import {Injectable, linkedSignal, signal} from '@angular/core';
import {RefreshTokenTO, UserAuthenticated} from '../models';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  token = signal<string | null>(null)
  user = signal<UserAuthenticated | null>(null)

  refresh = linkedSignal(() => this.user()?.accessToken)
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
      this.refresh = signal(refreshToken);
      localStorage.setItem('refresh', refreshToken);
    }
  }


  setToken(token: string | null): void {
    if (token) {
      this.token.set(token);
      this.isLoggedIn.set(true);
    } else {
      this.token.set(null);
      this.isLoggedIn.set(false);
    }
  }

  setRefresh({refreshToken, token}: RefreshTokenTO): void {
    if (refreshToken && token) {
      this.token = signal(token);
      this.refresh = signal(refreshToken);
      localStorage.setItem('access', token);
      localStorage.setItem('refresh', refreshToken);
    }
  }
}
