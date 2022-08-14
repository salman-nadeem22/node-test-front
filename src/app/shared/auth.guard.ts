import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser: any = await firstValueFrom(
      this.authService.getUser()
    ).catch(console.log);

    if (currentUser?.statusCode === 200) {
      return true;
    }
    this.router.navigate(['/auth/login']);
    return false;
  }
}
