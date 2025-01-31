import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private router: Router) { }

  logout(): void {
      localStorage.clear();
      this.router.navigate(['auth']).then()
  }
}
