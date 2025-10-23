// src/app/core/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Usuario, LoginRequest, RegistroRequest } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private usuarioSubject = new BehaviorSubject<Usuario | null>(null);
  public usuario$ = this.usuarioSubject.asObservable();

  constructor(private http: HttpClient) {
    const usuarioSalvo = localStorage.getItem('usuario');
    if (usuarioSalvo) {
      this.usuarioSubject.next(JSON.parse(usuarioSalvo));
    }
  }

  login(loginRequest: LoginRequest): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/login`, loginRequest)
      .pipe(
        tap(usuario => {
          this.usuarioSubject.next(usuario);
          localStorage.setItem('usuario', JSON.stringify(usuario));
          localStorage.setItem('token', usuario.token || '');
        })
      );
  }

  registro(registroRequest: RegistroRequest): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/registro`, registroRequest);
  }

  logout(): void {
    this.usuarioSubject.next(null);
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
  }

  getUsuarioAtual(): Usuario | null {
    return this.usuarioSubject.value;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  estaAutenticado(): boolean {
    return !!this.getToken();
  }
}
