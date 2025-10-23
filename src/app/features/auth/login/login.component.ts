import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="login-container">
      <div class="login-card">
        <h2>Login</h2>
        <form>
          <div class="form-group">
            <label>Email:</label>
            <input type="email" placeholder="Seu email">
          </div>
          <div class="form-group">
            <label>Senha:</label>
            <input type="password" placeholder="Sua senha">
          </div>
          <button type="submit" class="btn btn-primary">Entrar</button>
          <p>Não tem conta? <a routerLink="/register">Registre-se</a></p>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 60vh;
      padding: 2rem;
    }

    .login-card {
      background: white;
      padding: 2rem;
      border-radius: 1rem;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      width: 100%;
      max-width: 400px;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 600;
    }

    input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 0.5rem;
    }
  `]
})
export class LoginComponent { }
