import {ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, Router, withComponentInputBinding, withInMemoryScrolling} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi} from '@angular/common/http';
import {TokenInterceptor} from './interceptors/token.interceptor';
import {ErrorInterceptor} from './interceptors/error.interceptor';
import {SessionService} from './services/session.service';
import {AuthHttpService} from './http/auth.http.service';
import {appInit} from './utils/appInit';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),

    provideAppInitializer(() =>
      appInit(inject(AuthHttpService), inject(SessionService), inject(Router))
    ),

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
