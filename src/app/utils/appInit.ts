import {Router} from '@angular/router';
import {SessionService} from '../services/session.service';
import {AuthHttpService} from '../http/auth.http.service';
import {EMPTY, map, of, tap} from 'rxjs';

export const appInit = (authService: AuthHttpService, session: SessionService, router: Router) => {

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

}
