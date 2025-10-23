// src/app/features/home/home.component.ts
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="hero">
      <div class="hero-content">
        <h1>Bem-vindo à Loja Digital</h1>
        <p>Produtos digitais de alta qualidade para desenvolvedores e empreendedores.</p>
        <a routerLink="/produtos" class="cta-button">Ver Produtos</a>
      </div>
    </div>

    <div class="features">
      <div class="feature-card">
        <h3>🔒 Seguro</h3>
        <p>Autenticação JWT e dados protegidos.</p>
      </div>
      <div class="feature-card">
        <h3>🚀 Moderno</h3>
        <p>Frontend em Angular 18, backend em Spring Boot.</p>
      </div>
      <div class="feature-card">
        <h3>🛒 Simples</h3>
        <p>Compre em poucos cliques.</p>
      </div>
    </div>
  `,
  styles: [`
    .hero {
      background: linear-gradient(135deg, #1976d2, #0d47a1);
      color: white;
      text-align: center;
      padding: 4rem 1rem;
    }
    .hero h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }
    .hero p {
      font-size: 1.2rem;
      max-width: 600px;
      margin: 0 auto 2rem;
    }
    .cta-button {
      display: inline-block;
      padding: 12px 32px;
      background: white;
      color: #1976d2;
      text-decoration: none;
      border-radius: 30px;
      font-weight: bold;
      font-size: 1.1rem;
      transition: transform 0.2s;
    }
    .cta-button:hover {
      transform: translateY(-2px);
    }

    .features {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 2rem;
      padding: 3rem 1rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    .feature-card {
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      width: 280px;
      text-align: center;
    }
    .feature-card h3 {
      color: #1976d2;
      margin-bottom: 0.75rem;
    }
  `]
})
export class HomeComponent {}
