import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {SessionService} from '../services/session.service';

export const canActivateNotAuthGuard: CanActivateFn = () => {
  const sessionService = inject(SessionService);
  const router = inject(Router);

  if (sessionService.isLoggedIn()) {
    router.navigate(['/']).then();
  }
  return !sessionService.isLoggedIn();
};
