import {inject} from '@angular/core';
import {CanActivateFn, CanMatchFn, Router} from '@angular/router';
import {SessionService} from '../services/session.service';


export const canMatchAuthGuard: CanMatchFn = () => {
  const sessionService = inject(SessionService);
  const router = inject(Router);

  if (!sessionService.isLoggedIn()) {
    router.navigate(['/auth']).then();
  }
  return sessionService.isLoggedIn();
};

export const canActivateAuthGuard: CanActivateFn = () => {
  const sessionService = inject(SessionService);
  const router = inject(Router);

  if (!sessionService.isLoggedIn()) {
    router.navigate(['/auth']).then();
  }
  return sessionService.isLoggedIn();
};
