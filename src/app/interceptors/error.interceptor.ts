import {HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest} from '@angular/common/http';
import {inject} from '@angular/core';
import {catchError} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ErrorService} from '../services/error.service';

/**
 * Intercept all HTTP Errors, and if the request is Unauthenticated then send a Refresh Token API Call
 * @param req HttpRequest<any>
 * @param next HttpHandler
 * @return An Observable for HttpEvent
 */
export function ErrorInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const errorService = inject(ErrorService);
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => errorService.handleErrorResponse(err, req, next))
  );
}
