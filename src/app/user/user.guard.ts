import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private userService: UserService,
              private router: Router) {}

  canActivate(): boolean {
    if (this.userService.loggedIn()) {
      return true
    } else {
      this.router.navigate(['/login'])
      return false
    }
  }
}
