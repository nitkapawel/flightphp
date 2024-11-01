import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TOKEN_KEY, API_URL } from './auth-constants';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {}

  // Logowanie użytkownika i zapis tokenu
  login(username: string, password: string) {
    return this.http.post<any>(`${API_URL}/login`, { username, password });
  }
  

  // Sprawdzenie, czy użytkownik jest zalogowany
  isAuthenticated(): boolean {
    const token = localStorage.getItem(TOKEN_KEY);
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }

  // Pobieranie roli użytkownika z tokenu
  getUserRole(): string | null {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return null;

    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken?.role || null;
  }

  // Wylogowanie użytkownika
  logout() {
    localStorage.removeItem(TOKEN_KEY);
    this.router.navigate(['/login']);
  }
}
