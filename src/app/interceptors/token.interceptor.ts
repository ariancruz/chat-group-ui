import {inject} from '@angular/core';
import {HttpHandlerFn, HttpRequest} from '@angular/common/http';
import {SessionService} from '../services/session.service';

export function TokenInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  // Inject the current `AuthService` and use it to get an authentication token:
  const sessionService = inject(SessionService);
  // Clone the request to add the authentication header.
  const isLoggedIn = sessionService.isLoggedIn() && sessionService.token();
  const isNotRefresh = req.url.includes('/auth/refresh_token');
  if (isLoggedIn && !isNotRefresh) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${sessionService.token()}`
      }
    });
  }
  return next(req);
}
