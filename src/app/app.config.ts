import {ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, Router, withComponentInputBinding, withInMemoryScrolling} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi} from '@angular/common/http';
import {TokenInterceptor} from './interceptors/token.interceptor';
import {ErrorInterceptor} from './interceptors/error.interceptor';
import {SessionService} from './services/session.service';
import {AuthHttpService} from './http/auth.http.service';
import {EMPTY, map, of, tap} from 'rxjs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),

    provideAppInitializer(() => {
      const authService = inject(AuthHttpService);
      const session = inject(SessionService);
      const router = inject(Router);
      const token = localStorage.getItem('access')
      const refresh = localStorage.getItem('refresh')

      if (token) {
        session.setToken(token)
        session.setRefresh(refresh)
        return authService.profile().pipe(
          tap(user => session.setUserLogged(user)),
          map(() => router.navigate(['']))
        )
      }
      return of(EMPTY)
    }),

    provideHttpClient(
      withFetch(),
      withInterceptors([TokenInterceptor, ErrorInterceptor]),
      withInterceptorsFromDi(),
    ),

    provideAnimationsAsync(),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      })
    ),

    SessionService
  ]
};
