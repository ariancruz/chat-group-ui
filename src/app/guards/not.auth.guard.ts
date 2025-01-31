import {inject, Injectable} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {SessionService} from '../services/session.service';

export const canActivateNotAuthGuard: CanActivateFn = () => inject(NotAuthGuard).canActivate();

@Injectable({
  providedIn: 'root'
})
export class NotAuthGuard {
  constructor(private sessionService: SessionService, private router: Router) {
  }

  /**
   * CanActivate the module if the current user is not logged
   * else navigation redirect user to dashboard
   * @return An boolean value
   */
  canActivate(): boolean {
    if (this.sessionService.isLoggedIn()) {
      this.router.navigate(['/']).then();
    }
    return !this.sessionService.isLoggedIn();
  }
}
