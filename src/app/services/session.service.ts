import {Injectable, linkedSignal, signal} from '@angular/core';
import {RefreshTokenTO, UserAuthenticated} from '../models';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  token = signal<string | null>(null)
  userAuth = signal<UserAuthenticated | null>(null)

  refresh = linkedSignal(() => this.userAuth()?.accessToken)
  readonly isLoggedIn = linkedSignal(() => !!this.userAuth())
  readonly userId = linkedSignal(() => this.userAuth()?._id)

  logout(): void {
    localStorage.clear();
    this.token.set(null)
    this.userAuth.set(null)
  }

  setUserLogged(data: UserAuthenticated): void {
    const {accessToken, refreshToken} = data;

    this.userAuth.set(data)
    if (accessToken) {
      this.token.set(accessToken)
      localStorage.setItem('access', accessToken);
    }
    if (refreshToken) {
      this.refresh.set(refreshToken);
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
      this.token.set(token);
      this.refresh.set(refreshToken);
      localStorage.setItem('access', token);
      localStorage.setItem('refresh', refreshToken);
    }
  }
}
