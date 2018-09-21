import { Injectable } from '@angular/core';
import {CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router} from '@angular/router';
import {FirebaseService} from './firebase.service';
import {Observable} from 'rxjs';
@Injectable()
export class AuthGaurdService implements CanActivate {

  constructor(private fs: FirebaseService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean>| boolean {
    return this.checkLogin();
  }

  checkLogin(): boolean {

    if (this.fs.isLogin()) {
      return true;
    }
    this.router.navigate(['']);
    return false;

  }
}
@Injectable()
export class AnonymousGuardService implements CanActivate {

  constructor(private fs: FirebaseService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean>| boolean {
    return this.checkLogin();
  }

  checkLogin(): boolean {
    if (!this.fs.isLogin()) {
      return true;
    }
    this.router.navigate(['/home']);
    return false;

  }
}
