import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="auth-container">
      <h2>Criar Conta</h2>
      <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
        <input formControlName="name" placeholder="Nome completo" />
        <input formControlName="email" placeholder="Email" type="email" />
        <input formControlName="password" placeholder="Senha" type="password" />
        <button type="submit" [disabled]="registerForm.invalid">Cadastrar</button>
        <p><a routerLink="/login">Já tem conta? Faça login</a></p>
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
      background: #2e7d32;
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
export class RegisterComponent {
  registerForm: any;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { name, email, password } = this.registerForm.value;
      this.auth.register(name!, email!, password!).subscribe(success => {
        if (success) {
          alert('Conta criada com sucesso! Faça login.');
          this.router.navigate(['/login']);
        } else {
          alert('Erro ao criar conta.');
        }
      });
    }
  }
}
