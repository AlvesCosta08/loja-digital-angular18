import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="home-container">
      <div class="hero-section">
        <div class="hero-content">
          <h1>Bem-vindo à Loja Digital</h1>
          <p>Encontre os melhores produtos com os melhores preços</p>
          <div class="hero-actions">
            <a routerLink="/catalog" class="btn btn-primary">Ver Produtos</a>
            <a routerLink="/register" class="btn btn-secondary">Criar Conta</a>
          </div>
        </div>
      </div>

      <section class="features">
        <div class="feature-card">
          <h3>🛒 Compras Fáceis</h3>
          <p>Interface simples e intuitiva para suas compras</p>
        </div>
        <div class="feature-card">
          <h3>🚚 Entrega Rápida</h3>
          <p>Receba seus produtos no conforto da sua casa</p>
        </div>
        <div class="feature-card">
          <h3>💳 Pagamento Seguro</h3>
          <p>Seus dados protegidos com criptografia</p>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .home-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    .hero-section {
      text-align: center;
      padding: 4rem 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 1rem;
      color: white;
      margin-bottom: 3rem;
    }

    .hero-content h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .hero-content p {
      font-size: 1.25rem;
      margin-bottom: 2rem;
      opacity: 0.9;
    }

    .hero-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
    }

    .btn {
      padding: 1rem 2rem;
      border: none;
      border-radius: 0.5rem;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s;
    }

    .btn-primary {
      background: white;
      color: #667eea;
    }

    .btn-secondary {
      background: transparent;
      color: white;
      border: 2px solid white;
    }

    .btn:hover {
      transform: translateY(-2px);
    }

    .features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .feature-card {
      background: white;
      padding: 2rem;
      border-radius: 1rem;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      text-align: center;
    }

    .feature-card h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }
  `]
})
export class HomeComponent { }
