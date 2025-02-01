import {HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest} from '@angular/common/http';
import {inject} from '@angular/core';
import {catchError, filter, finalize, switchMap, take} from 'rxjs/operators';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {NotifyService} from '../services/notify.service';
import {SessionService} from '../services/session.service';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {RefreshTokenTO} from '../models';

export function ErrorInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const router = inject(Router);
  const authService = inject(AuthService);
  const messageService = inject(NotifyService);
  const sessionService = inject(SessionService);

  let refreshTokenInProgress = false;
  const refreshTokenSubject = new BehaviorSubject<any>(null);

  const resetSession = (): void => {
    refreshTokenInProgress = false;
    sessionService.logout();
    router.navigate(['auth']).then()
  }

  const addAuthToken = (request: HttpRequest<any>): HttpRequest<any> => {
    const token = refreshTokenSubject.getValue();
    if (!token) {
      return request;
    }
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  const updateSession = (resp: RefreshTokenTO): void => {
    refreshTokenSubject.next(resp.token);
    sessionService.setRefresh(resp);
  }

  const handle401Error = (err: HttpErrorResponse, request: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
    if (refreshTokenInProgress) {
      if (err.url?.includes('refresh')) {
        resetSession();
        return throwError(() => err);
      }
      return refreshTokenSubject.pipe(
        filter(result => result !== null),
        take(1),
        switchMap(() => next(addAuthToken(request)))
      );
    } else {
      refreshTokenInProgress = true;
      refreshTokenSubject.next(null);
      sessionService.setToken(null);

      return authService.refreshToken(sessionService.refresh() || '' ).pipe(
        switchMap((resp: RefreshTokenTO) => {
          updateSession(resp);
          return next(addAuthToken(request));
        }),
        finalize(() => (refreshTokenInProgress = false)),
        catchError((errAuth) => {
          resetSession();
          return throwError(() => errAuth.details);
        })
      );
    }
  }


  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      const {status, error} = err;
      if (status === 401) {
        return handle401Error(err, req, next);
      } else {
        const {message} = error;
        // Display error message (via MatSnackBar)
        messageService.error(message.toString());
      }

      // Pass error to the caller
      return throwError(() => error);
    })
  );
}
