import {inject, Injectable, linkedSignal, signal} from '@angular/core';
import {RefreshTokenTO, UserAuthenticated} from '../models';
import {SocketService} from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  token = signal<string | null>(null)
  userAuth = signal<UserAuthenticated | null>(null)

  refresh = linkedSignal(() => this.userAuth()?.accessToken || null)
  readonly isLoggedIn = linkedSignal(() => !!this.userAuth())
  readonly userId = linkedSignal(() => this.userAuth()?._id)

  private readonly socket = inject(SocketService);

  logout(): void {
    localStorage.clear();
    this.token.set(null);
    this.userAuth.set(null);
    this.socket.disconnect();
  }

  setUserLogged(data: UserAuthenticated): void {
    const {accessToken, refreshToken} = data;

    this.userAuth.set(data)
    if (accessToken) {
      this.token.set(accessToken)
      localStorage.setItem('access', accessToken);

      this.socket.connect();
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

  setRefresh(refreshToken: string | null): void {
    this.refresh.set(refreshToken);
  }

  setUpdateCredentials({refreshToken, token}: RefreshTokenTO): void {
    if (refreshToken && token) {
      this.token.set(token);
      this.refresh.set(refreshToken);
      localStorage.setItem('access', token);
      localStorage.setItem('refresh', refreshToken);
    }
  }
}
