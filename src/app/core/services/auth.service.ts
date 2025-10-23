import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'auth_token';

  login(email: string, password: string): Observable<boolean> {
    if (email && password) {
      localStorage.setItem(this.tokenKey, 'fake-jwt-token');
      return of(true);
    }
    return of(false);
  }

  register(name: string, email: string, password: string): Observable<boolean> {
    if (name && email && password) {
      return of(true);
    }
    return of(false);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
