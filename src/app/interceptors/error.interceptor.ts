import {HttpErrorResponse, HttpHandlerFn, HttpRequest} from '@angular/common/http';
import {inject} from '@angular/core';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {NotifyService} from '../services/notify.service';

export function ErrorInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const messageService = inject(NotifyService);

  return next(req).pipe(
    catchError(({error}: HttpErrorResponse) => {
      const { error: title, message } = error;

      // Display error message (via MatSnackBar)
      messageService.error(message.toString());

      // Pass error to the caller
      return throwError(() => message);
    })
  );
}
