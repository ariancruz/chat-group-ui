import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Router, RouterStateSnapshot} from '@angular/router';
import {SessionService} from '../services/session.service';



export const canMatchAuthGuard: CanMatchFn = () => inject(AuthGuard).canMatch();

export const canActivateAuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(AuthGuard).canActivate(route, state);

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private router: Router,
              private sessionService: SessionService) {
  }

  /**
   * CanActivate the module if Authenticated user is isLoggedIn else redirect to login page
   * @param route {@link ActivatedRouteSnapshot}
   * @param state {@link RouterStateSnapshot}
   * @return An boolean value
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.sessionService.isLoggedIn()) {
      this.router.navigate(['/auth'], {queryParams: {returnUrl: state.url}}).then();
    }
    return this.sessionService.isLoggedIn();
  }

  /**
   * CanLoad the module if Authenticated user is isLoggedIn else redirect to login page
   * @return An boolean value
   */
  canMatch(): boolean {
    const {pathname, search} = window.location;
    if (!this.sessionService.isLoggedIn()) {
      this.router.navigate(['/auth'], {queryParams: {returnUrl: pathname + '' + search}}).then();
    }
    return this.sessionService.isLoggedIn();
  }
}
