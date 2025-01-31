import {inject, Injectable, signal} from '@angular/core';
import {Router} from '@angular/router';
import {UserAuthenticated} from '../models';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  token = signal<string | null>(null)
  user = signal<UserAuthenticated | null>(null)

  private readonly router = inject(Router)

  logout(): void {
    localStorage.clear();
    this.token.set(null)
    this.user.set(null)
    this.router.navigate(['auth']).then()
  }

  setUserLogged(data: UserAuthenticated): void {
    const {accessToken} = data;
    this.token.set(accessToken)
    this.user.set(data)
    localStorage.setItem('access', accessToken);
    this.router.navigate(['']).then()
  }
}
