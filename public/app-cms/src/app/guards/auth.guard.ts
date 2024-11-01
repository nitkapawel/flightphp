import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Sprawdzenie logowania przy próbie dostępu do /login
    if (state.url === '/login') {
      if (this.authService.isAuthenticated()) {
        this.router.navigate(['/dashboard']); // Przekierowanie na dashboard, jeśli zalogowany
        return false;
      }
      return true; // Zezwól na dostęp do loginu, jeśli niezalogowany
    }

    // Sprawdzenie autoryzacji dla chronionych tras
    if (this.authService.isAuthenticated()) {
      const requiredRole = route.data['role'] as string;
      const userRole = this.authService.getUserRole();

      // Jeśli trasa wymaga konkretnej roli, sprawdź jej zgodność
      if (requiredRole && userRole !== requiredRole) {
        this.router.navigate(['/unauthorized']); // Przekierowanie, jeśli rola nie jest zgodna
        return false;
      }
      return true; // Zezwól na dostęp, jeśli rola jest odpowiednia
    }

    // Przekierowanie na /login, jeśli użytkownik nie jest zalogowany
    this.router.navigate(['/login']);
    return false;
  }
}
