import {inject, Injectable} from '@angular/core';
import {AuthHttpService} from '../http/auth.http.service';
import {NotifyService} from './notify.service';
import {SessionService} from './session.service';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest} from '@angular/common/http';
import {catchError, filter, finalize, switchMap, take} from 'rxjs/operators';
import {RefreshTokenTO} from '../models';

@Injectable({providedIn: 'root'})
export class ErrorService {
  /**
   * Controls refresh token
   * @private isRefreshing boolean default value false
   */
  private readonly authService = inject(AuthHttpService);
  private readonly messageService = inject(NotifyService);
  private readonly sessionService = inject(SessionService);
  private refreshTokenInProgress = false;
  private refreshTokenSubject = new BehaviorSubject<any>(null);

  handleErrorResponse(err: HttpErrorResponse, request: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
    const {status, error} = err;
    if (status === 401) {
      return this.handle401Error(err, request, next);
    } else {
      const {message} = error;
      // Display error message (via MatSnackBar)
      this.messageService.error(message.toString());
    }

    // Pass error to the caller
    return throwError(() => error);
  }

  private handle401Error(err: HttpErrorResponse, request: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
    if (this.refreshTokenInProgress) {
      if (err.url?.includes('refresh')) {
        this.resetSession();
        return throwError(() => err);
      }
      return this.refreshTokenSubject.pipe(
        filter(result => result !== null),
        take(1),
        switchMap(() => next(this.addAuthToken(request)))
      );
    } else {
      this.refreshTokenInProgress = true;
      this.refreshTokenSubject.next(null);
      this.sessionService.setToken(null);
      return this.authService.refreshToken(this.sessionService.refresh() || '').pipe(
        switchMap((resp: RefreshTokenTO) => {
          this.updateSession(resp);
          return next(this.addAuthToken(request));
        }),
        finalize(() => {
          this.refreshTokenInProgress = false;
        }),
        catchError((errAuth) => {
          this.resetSession();
          return throwError(() => errAuth.details);
        })
      );
    }
  }

  private addAuthToken(request: HttpRequest<any>): HttpRequest<any> {
    const token = this.refreshTokenSubject.getValue();
    if (!token) {
      return request;
    }
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  private resetSession(): void {
    this.refreshTokenInProgress = false;
    this.sessionService.logout();
    window.location.reload();
  }

  private updateSession(resp: RefreshTokenTO): void {
    this.refreshTokenSubject.next(resp.token);
    this.sessionService.setUpdateCredentials(resp);
  }
}
