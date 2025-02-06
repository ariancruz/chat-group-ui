import {ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, Router, withComponentInputBinding} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideHttpClient, withFetch, withInterceptors} from '@angular/common/http';
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
    ),

    provideAnimationsAsync(),
    provideRouter(
      routes,
      withComponentInputBinding()
    ),

    SessionService
  ]
};
