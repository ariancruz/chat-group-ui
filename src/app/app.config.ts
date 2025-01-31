import {ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, Router, withComponentInputBinding} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideHttpClient, withFetch, withInterceptors} from '@angular/common/http';
import {TokenInterceptor} from './interceptors/token.interceptor';
import {ErrorInterceptor} from './interceptors/error.interceptor';
import {SessionService} from './services/session.service';
import {AuthService} from './services/auth.service';
import {EMPTY, map, of, tap} from 'rxjs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideAnimationsAsync(),
    provideRouter(
      routes,
      withComponentInputBinding()
    ),
    provideHttpClient(
      withFetch(),
      withInterceptors([TokenInterceptor, ErrorInterceptor])
    ),

    provideAppInitializer(() => {
      const authService = inject(AuthService);
      const session = inject(SessionService);
      const router = inject(Router);
      const token = localStorage.getItem('access')

      if (token) {
        session.setToken(token)
        return authService.profile().pipe(
          tap(session.setUserLogged),
          map(() => router.navigate(['']))
        )
      }
      return of(EMPTY)
    }),

    SessionService
  ]
};
