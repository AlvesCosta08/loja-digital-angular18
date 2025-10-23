import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarrinhoService } from '../../core/services/carrinho.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="home-container">
      <!-- Hero Banner Principal -->
      <section class="hero-banner">
        <div class="banner-content">
          <div class="banner-text">
            <h1 class="banner-title">
              Tudo que você precisa
              <span class="highlight">em um só lugar</span>
            </h1>
            <p class="banner-subtitle">
              Milhares de produtos com entrega rápida e preços incríveis
            </p>
            <div class="search-section">
              <div class="search-box">
                <input
                  type="text"
                  placeholder="Buscar produtos, marcas e muito mais..."
                  class="search-input"
                >
                <button class="search-btn">
                  <span class="search-icon">🔍</span>
                </button>
              </div>
            </div>
          </div>
          <div class="banner-visual">
            <div class="floating-products">
              <div class="product-card" *ngFor="let product of featuredProducts"
                   [style.animation-delay]="product.delay">
                <img [src]="product.image" [alt]="product.name" class="product-img">
                <div class="product-info">
                  <span class="product-price">{{ product.price }}</span>
                  <span class="product-name">{{ product.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Categorias Populares -->
      <section class="categories-section">
        <div class="container">
          <h2 class="section-title">Categorias populares</h2>
          <div class="categories-grid">
            <a *ngFor="let category of categories"
               [routerLink]="['/catalog']"
               [queryParams]="{categoria: category.name}"
               class="category-card">
              <div class="category-icon">{{ category.icon }}</div>
              <span class="category-name">{{ category.name }}</span>
            </a>
          </div>
        </div>
      </section>

      <!-- Ofertas em Destaque -->
      <section class="deals-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Ofertas da semana</h2>
            <a routerLink="/catalog" class="see-all">Ver todos</a>
          </div>
          <div class="deals-grid">
            <div *ngFor="let deal of deals" class="deal-card">
              <div class="deal-badge">Oferta</div>
              <img [src]="deal.image" [alt]="deal.name" class="deal-img">
              <div class="deal-info">
                <h3 class="deal-name">{{ deal.name }}</h3>
                <div class="deal-price">
                  <span class="current-price">{{ deal.currentPrice }}</span>
                  <span class="original-price">{{ deal.originalPrice }}</span>
                  <span class="discount">{{ deal.discount }}</span>
                </div>
                <div class="deal-shipping">
                  <span class="free-shipping">Frete grátis</span>
                </div>
                <button class="add-to-cart-btn" (click)="addToCart(deal)">
                  🛒 Comprar
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Banner de Vantagens -->
      <section class="benefits-section">
        <div class="container">
          <div class="benefits-grid">
            <div class="benefit-item">
              <div class="benefit-icon">🚚</div>
              <div class="benefit-text">
                <strong>Frete grátis</strong>
                <span>Em compras acima de R$ 79</span>
              </div>
            </div>
            <div class="benefit-item">
              <div class="benefit-icon">💳</div>
              <div class="benefit-text">
                <strong>Parcele em até 12x</strong>
                <span>No cartão de crédito</span>
              </div>
            </div>
            <div class="benefit-item">
              <div class="benefit-icon">🛡️</div>
              <div class="benefit-text">
                <strong>Compra segura</strong>
                <span>Seus dados protegidos</span>
              </div>
            </div>
            <div class="benefit-item">
              <div class="benefit-icon">↩️</div>
              <div class="benefit-text">
                <strong>Devolução grátis</strong>
                <span>Em até 30 dias</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .home-container {
      min-height: 100vh;
    }

    /* Hero Banner */
    .hero-banner {
      background: linear-gradient(135deg, #fff 0%, #f8f9fa 100%);
      padding: 3rem 0;
      border-bottom: 1px solid #e6e6e6;
    }

    .banner-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
    }

    .banner-title {
      font-size: 3rem;
      font-weight: 700;
      line-height: 1.1;
      margin-bottom: 1rem;
      color: #2d2d2d;
    }

    .highlight {
      color: #2968c8;
    }

    .banner-subtitle {
      font-size: 1.25rem;
      color: #666;
      margin-bottom: 2rem;
    }

    .search-box {
      display: flex;
      max-width: 500px;
      background: white;
      border: 2px solid #2968c8;
      border-radius: 4px;
      overflow: hidden;
    }

    .search-input {
      flex: 1;
      padding: 1rem;
      border: none;
      outline: none;
      font-size: 1rem;
    }

    .search-btn {
      background: #2968c8;
      border: none;
      padding: 1rem 1.5rem;
      cursor: pointer;
      transition: background 0.3s;
    }

    .search-btn:hover {
      background: #1e5bb7;
    }

    .search-icon {
      color: white;
      font-size: 1.2rem;
    }

    .floating-products {
      position: relative;
      height: 300px;
    }

    .product-card {
      position: absolute;
      background: white;
      border-radius: 8px;
      padding: 1rem;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      border: 1px solid #e6e6e6;
      animation: float 3s ease-in-out infinite;
      display: flex;
      align-items: center;
      gap: 1rem;
      max-width: 250px;
    }

    .product-card:nth-child(1) {
      top: 20px;
      left: 0;
    }

    .product-card:nth-child(2) {
      top: 120px;
      right: 0;
      animation-delay: 1s !important;
    }

    .product-card:nth-child(3) {
      bottom: 20px;
      left: 50px;
      animation-delay: 2s !important;
    }

    .product-img {
      width: 60px;
      height: 60px;
      object-fit: cover;
      border-radius: 4px;
    }

    .product-info {
      display: flex;
      flex-direction: column;
    }

    .product-price {
      font-weight: 700;
      color: #2d2d2d;
      font-size: 1.1rem;
    }

    .product-name {
      color: #666;
      font-size: 0.9rem;
    }

    /* Categorias */
    .categories-section {
      padding: 4rem 0;
      background: white;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    .section-title {
      font-size: 2rem;
      font-weight: 600;
      margin-bottom: 2rem;
      color: #2d2d2d;
    }

    .categories-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 1.5rem;
    }

    .category-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1.5rem 1rem;
      background: #f8f9fa;
      border-radius: 8px;
      text-decoration: none;
      color: #2d2d2d;
      transition: all 0.3s ease;
      border: 1px solid transparent;
    }

    .category-card:hover {
      background: white;
      border-color: #2968c8;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(41, 104, 200, 0.1);
    }

    .category-icon {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }

    .category-name {
      font-weight: 500;
      text-align: center;
    }

    /* Ofertas */
    .deals-section {
      padding: 4rem 0;
      background: #f8f9fa;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .see-all {
      color: #2968c8;
      text-decoration: none;
      font-weight: 500;
    }

    .see-all:hover {
      text-decoration: underline;
    }

    .deals-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }

    .deal-card {
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      position: relative;
      border: 1px solid #e6e6e6;
      transition: all 0.3s ease;
    }

    .deal-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0,0,0,0.1);
    }

    .deal-badge {
      position: absolute;
      top: 1rem;
      left: 1rem;
      background: #ff4444;
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 4px;
      font-size: 0.8rem;
      font-weight: 600;
    }

    .deal-img {
      width: 100%;
      height: 200px;
      object-fit: contain;
      margin-bottom: 1rem;
    }

    .deal-name {
      font-size: 1rem;
      font-weight: 500;
      margin-bottom: 1rem;
      color: #2d2d2d;
      line-height: 1.4;
    }

    .deal-price {
      margin-bottom: 1rem;
    }

    .current-price {
      font-size: 1.5rem;
      font-weight: 700;
      color: #2d2d2d;
      display: block;
    }

    .original-price {
      font-size: 1rem;
      color: #999;
      text-decoration: line-through;
      margin-right: 0.5rem;
    }

    .discount {
      background: #00a650;
      color: white;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      font-size: 0.8rem;
      font-weight: 600;
    }

    .deal-shipping {
      margin-bottom: 1rem;
    }

    .free-shipping {
      color: #00a650;
      font-size: 0.9rem;
      font-weight: 500;
    }

    .add-to-cart-btn {
      width: 100%;
      background: #2968c8;
      color: white;
      border: none;
      padding: 0.75rem;
      border-radius: 4px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.3s;
    }

    .add-to-cart-btn:hover {
      background: #1e5bb7;
    }

    /* Benefícios */
    .benefits-section {
      padding: 3rem 0;
      background: white;
      border-top: 1px solid #e6e6e6;
    }

    .benefits-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }

    .benefit-item {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .benefit-icon {
      font-size: 2rem;
    }

    .benefit-text {
      display: flex;
      flex-direction: column;
    }

    .benefit-text strong {
      color: #2d2d2d;
      font-weight: 600;
    }

    .benefit-text span {
      color: #666;
      font-size: 0.9rem;
    }

    /* Animações */
    @keyframes float {
      0%, 100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-10px);
      }
    }

    /* Responsivo */
    @media (max-width: 768px) {
      .banner-content {
        grid-template-columns: 1fr;
        gap: 2rem;
        text-align: center;
      }

      .banner-title {
        font-size: 2rem;
      }

      .search-box {
        max-width: 100%;
      }

      .floating-products {
        height: 200px;
      }

      .product-card {
        max-width: 200px;
        padding: 0.75rem;
      }

      .categories-grid {
        grid-template-columns: repeat(3, 1fr);
      }

      .deals-grid {
        grid-template-columns: repeat(2, 1fr);
      }

      .benefits-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 480px) {
      .deals-grid {
        grid-template-columns: 1fr;
      }

      .categories-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  `]
})
export class HomeComponent {
  private carrinhoService = inject(CarrinhoService);

  featuredProducts = [
    {
      name: 'Smartphone',
      price: 'R$ 1.299',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=150',
      delay: '0s'
    },
    {
      name: 'Fone Bluetooth',
      price: 'R$ 299',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150',
      delay: '1s'
    },
    {
      name: 'Notebook',
      price: 'R$ 4.599',
      image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=150',
      delay: '2s'
    }
  ];

  categories = [
    { name: 'Celulares', icon: '📱' },
    { name: 'Eletrônicos', icon: '💻' },
    { name: 'Casa', icon: '🏠' },
    { name: 'Moda', icon: '👕' },
    { name: 'Esportes', icon: '⚽' },
    { name: 'Beleza', icon: '💄' },
    { name: 'Livros', icon: '📚' },
    { name: 'Brinquedos', icon: '🎮' }
  ];

  deals = [
    {
      name: 'Smartphone Android 128GB',
      currentPrice: 'R$ 1.299',
      originalPrice: 'R$ 1.599',
      discount: '19% OFF',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300'
    },
    {
      name: 'Fone Bluetooth Cancelamento de Ruído',
      currentPrice: 'R$ 299',
      originalPrice: 'R$ 399',
      discount: '25% OFF',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300'
    },
    {
      name: 'Notebook Gamer RTX 3050',
      currentPrice: 'R$ 4.599',
      originalPrice: 'R$ 5.199',
      discount: '12% OFF',
      image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=300'
    },
    {
      name: 'Smart TV 55" 4K',
      currentPrice: 'R$ 2.399',
      originalPrice: 'R$ 2.899',
      discount: '17% OFF',
      image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300'
    }
  ];

  addToCart(product: any): void {
    // Simulação de adição ao carrinho
    alert(`${product.name} adicionado ao carrinho!`);
  }
}
