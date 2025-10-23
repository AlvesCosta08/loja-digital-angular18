import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="auth-container">
      <h2>Login</h2>
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <input formControlName="email" placeholder="Email" type="email" />
        <input formControlName="password" placeholder="Senha" type="password" />
        <button type="submit" [disabled]="loginForm.invalid">Entrar</button>
        <p><a routerLink="/register">Ainda não tem conta? Cadastre-se</a></p>
      </form>
    </div>
  `,
  styles: [`
    .auth-container {
      max-width: 400px;
      margin: 3rem auto;
      padding: 2rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      background: white;
    }
    h2 { text-align: center; margin-bottom: 1.5rem; }
    input {
      width: 100%;
      padding: 10px;
      margin-bottom: 1rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 16px;
    }
    button {
      width: 100%;
      padding: 12px;
      background: #1976d2;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
    }
    button:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
    p { text-align: center; margin-top: 1rem; }
    a { color: #1976d2; text-decoration: none; }
  `]
})
export class LoginComponent {
  loginForm: any;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.auth.login(email!, password!).subscribe(success => {
        if (success) {
          this.router.navigate(['/produtos']);
        } else {
          alert('Credenciais inválidas');
        }
      });
    }
  }
}
