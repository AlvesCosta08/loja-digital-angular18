import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarrinhoService } from '../../core/services/carrinho.service';
import { Produto } from '../../core/models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="home-container">
      <!-- Header Principal Único -->
      <header class="main-header">
        <div class="container">
          <!-- Logo e Navegação -->
          <div class="header-content">
            <div class="logo-section">
              <a routerLink="/" class="logo">
                <span class="logo-icon">🛍️</span>
                <span class="logo-text">LojaDigital</span>
              </a>
            </div>

            <!-- Barra de Pesquisa -->
            <div class="search-section">
              <div class="search-container">
                <input
                  type="text"
                  placeholder="Buscar produtos, marcas e muito mais..."
                  class="search-input"
                >
                <button class="search-button">
                  <span class="search-icon">🔍</span>
                </button>
              </div>
            </div>

            <!-- Menu Principal -->
            <nav class="main-nav">
              <a routerLink="/products" class="nav-link">
                <span class="nav-text">Produtos</span>
              </a>
              <a routerLink="/login" class="nav-link">
                <span class="nav-text">Login</span>
              </a>
              <a routerLink="/register" class="nav-link">
                <span class="nav-text">Registrar</span>
              </a>
              <a routerLink="/cart" class="nav-link cart-link">
                <span class="nav-icon">🛒</span>
                <span class="cart-badge" *ngIf="quantidadeItens > 0">{{ quantidadeItens }}</span>
              </a>
            </nav>
          </div>
        </div>

        <!-- Banner Hero -->
        <div class="hero-banner">
          <div class="container">
            <div class="hero-content">
              <div class="hero-text">
                <h1 class="hero-title">
                  As melhores <span class="highlight">ofertas</span> você encontra aqui!
                </h1>
                <p class="hero-subtitle">
                  Frete grátis em milhares de produtos • Parcele em até 12x • Devolução grátis
                </p>
                <div class="hero-actions">
                  <a routerLink="/catalog" class="btn btn-primary">
                    Ver Ofertas
                    <span class="btn-arrow">→</span>
                  </a>
                  <a routerLink="/categories" class="btn btn-secondary">
                    Categorias
                  </a>
                </div>
              </div>
              <div class="hero-visual">
                <div class="floating-card card-1">
                  <div class="card-icon">📱</div>
                  <h4>Celulares</h4>
                  <p>Até 40% OFF</p>
                </div>
                <div class="floating-card card-2">
                  <div class="card-icon">🎧</div>
                  <h4>Áudio</h4>
                  <p>Frete grátis</p>
                </div>
                <div class="floating-card card-3">
                  <div class="card-icon">💻</div>
                  <h4>Eletrônicos</h4>
                  <p>Ofertas especiais</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Resto do conteúdo permanece igual -->
      <section class="categories-section">
        <div class="container">
          <h2 class="section-title">Categorias populares</h2>
          <div class="categories-grid">
            <a *ngFor="let category of categories"
               [routerLink]="['/catalog']"
               [queryParams]="{ category: category.name }"
               class="category-card">
              <div class="category-icon">{{ category.icon }}</div>
              <span class="category-name">{{ category.name }}</span>
            </a>
          </div>
        </div>
      </section>

      <section class="deals-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Ofertas imperdíveis</h2>
            <a routerLink="/catalog" class="see-all-link">
              Ver todas
              <span class="link-arrow">→</span>
            </a>
          </div>
          <div class="deals-grid">
            <div *ngFor="let deal of deals; let i = index"
                 class="deal-card"
                 [class.featured]="i === 0">
              <div class="deal-badge" *ngIf="deal.discount">{{ deal.discount }}</div>
              <div class="deal-image">
                <img [src]="deal.image" [alt]="deal.name" loading="lazy">
              </div>
              <div class="deal-content">
                <h3 class="deal-name">{{ deal.name }}</h3>
                <div class="deal-prices">
                  <span class="current-price">{{ deal.currentPrice }}</span>
                  <span class="original-price" *ngIf="deal.originalPrice">
                    {{ deal.originalPrice }}
                  </span>
                </div>
                <div class="deal-shipping" *ngIf="deal.freeShipping">
                  <span class="shipping-badge">Frete grátis</span>
                </div>
                <div class="deal-actions">
                  <button class="buy-btn" (click)="addToCart(deal)">
                    Comprar agora
                  </button>
                  <button class="cart-btn" (click)="addToCart(deal)" title="Adicionar ao carrinho">
                    🛒
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="benefits-section">
        <div class="container">
          <div class="benefits-grid">
            <div class="benefit-card">
              <div class="benefit-icon">🚚</div>
              <div class="benefit-content">
                <h3>Frete grátis</h3>
                <p>Em compras acima de R$ 79</p>
              </div>
            </div>
            <div class="benefit-card">
              <div class="benefit-icon">💳</div>
              <div class="benefit-content">
                <h3>Parcele sem juros</h3>
                <p>Em até 12x no cartão</p>
              </div>
            </div>
            <div class="benefit-card">
              <div class="benefit-icon">🛡️</div>
              <div class="benefit-content">
                <h3>Compra segura</h3>
                <p>Seus dados protegidos</p>
              </div>
            </div>
            <div class="benefit-card">
              <div class="benefit-icon">↩️</div>
              <div class="benefit-content">
                <h3>Devolução fácil</h3>
                <p>Primeira troca grátis</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="newsletter-section">
        <div class="container">
          <div class="newsletter-content">
            <h2>Não perca as melhores ofertas!</h2>
            <p>Cadastre-se e receba promoções exclusivas</p>
            <div class="newsletter-form">
              <input type="email" placeholder="Seu e-mail" class="email-input" #emailInput>
              <button class="subscribe-btn" (click)="subscribeNewsletter(emailInput.value)">Cadastrar</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .home-container {
      min-height: 100vh;
      background: #f5f5f5;
    }

    /* Header Principal Único */
    .main-header {
      background: linear-gradient(135deg, #2968c8 0%, #1e5bb7 100%);
      color: white;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    .header-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
      padding: 1rem 0;
    }

    .logo-section {
      flex-shrink: 0;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
      color: white;
      font-weight: 700;
      font-size: 1.5rem;
    }

    .logo-icon {
      font-size: 2rem;
    }

    .search-section {
      flex: 1;
      max-width: 600px;
    }

    .search-container {
      display: flex;
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .search-input {
      flex: 1;
      padding: 0.75rem 1rem;
      border: none;
      outline: none;
      font-size: 1rem;
      color: #333;
    }

    .search-button {
      background: #e0e0e0;
      border: none;
      padding: 0.75rem 1.5rem;
      cursor: pointer;
      transition: background 0.3s;
    }

    .search-button:hover {
      background: #d0d0d0;
    }

    /* Menu Principal */
    .main-nav {
      display: flex;
      gap: 2rem;
      align-items: center;
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: white;
      text-decoration: none;
      font-weight: 500;
      transition: opacity 0.3s;
      position: relative;
      padding: 0.5rem 0;
    }

    .nav-link:hover {
      opacity: 0.8;
    }

    .cart-link {
      position: relative;
    }

    .cart-badge {
      position: absolute;
      top: -8px;
      right: -8px;
      background: #ff4444;
      color: white;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      font-size: 0.75rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
    }

    /* Hero Banner */
    .hero-banner {
      padding: 3rem 0;
      background: linear-gradient(135deg, #2968c8 0%, #1e5bb7 100%);
    }

    .hero-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
    }

    .hero-title {
      font-size: 3.5rem;
      font-weight: 800;
      line-height: 1.1;
      margin-bottom: 1.5rem;
      color: white;
    }

    .highlight {
      background: linear-gradient(135deg, #ffd700, #ff6b6b);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .hero-subtitle {
      font-size: 1.25rem;
      opacity: 0.9;
      margin-bottom: 2.5rem;
      line-height: 1.6;
      color: white;
    }

    .hero-actions {
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 1rem 2rem;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s ease;
      border: 2px solid transparent;
    }

    .btn-primary {
      background: white;
      color: #2968c8;
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(255,255,255,0.2);
    }

    .btn-secondary {
      background: transparent;
      color: white;
      border-color: rgba(255,255,255,0.3);
    }

    .btn-secondary:hover {
      background: rgba(255,255,255,0.1);
      border-color: white;
    }

    .btn-arrow {
      transition: transform 0.3s ease;
    }

    .btn:hover .btn-arrow {
      transform: translateX(4px);
    }

    .hero-visual {
      position: relative;
      height: 300px;
    }

    .floating-card {
      position: absolute;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      padding: 1.5rem;
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.1);
      border: 1px solid rgba(255,255,255,0.2);
      text-align: center;
      transition: all 0.3s ease;
      color: #333;
      min-width: 120px;
    }

    .floating-card:hover {
      transform: translateY(-10px) scale(1.05);
    }

    .card-1 {
      top: 20%;
      left: 10%;
      animation: float 3s ease-in-out infinite;
    }

    .card-2 {
      top: 50%;
      right: 10%;
      animation: float 3s ease-in-out infinite 1s;
    }

    .card-3 {
      bottom: 20%;
      left: 30%;
      animation: float 3s ease-in-out infinite 2s;
    }

    .card-icon {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }

    .floating-card h4 {
      margin: 0 0 0.5rem 0;
      font-weight: 600;
      font-size: 1rem;
    }

    .floating-card p {
      margin: 0;
      font-size: 0.9rem;
      opacity: 0.7;
    }

    /* Seções restantes */
    .categories-section {
      padding: 4rem 0;
      background: white;
    }

    .section-title {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 2rem;
      text-align: center;
      color: #2d2d2d;
    }

    .categories-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 1.5rem;
    }

    .category-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2rem 1rem;
      background: #f8f9fa;
      border-radius: 12px;
      text-decoration: none;
      color: #2d2d2d;
      transition: all 0.3s ease;
      border: 2px solid transparent;
    }

    .category-card:hover {
      background: white;
      border-color: #2968c8;
      transform: translateY(-4px);
      box-shadow: 0 8px 25px rgba(41, 104, 200, 0.15);
    }

    .category-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    .category-name {
      font-weight: 600;
      text-align: center;
    }

    .deals-section {
      padding: 4rem 0;
      background: #f8f9fa;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 3rem;
    }

    .see-all-link {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #2968c8;
      text-decoration: none;
      font-weight: 600;
      transition: gap 0.3s ease;
    }

    .see-all-link:hover {
      gap: 0.75rem;
    }

    .link-arrow {
      transition: transform 0.3s ease;
    }

    .see-all-link:hover .link-arrow {
      transform: translateX(4px);
    }

    .deals-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
    }

    .deal-card {
      background: white;
      border-radius: 16px;
      padding: 1.5rem;
      position: relative;
      border: 1px solid #e8e8e8;
      transition: all 0.3s ease;
    }

    .deal-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 16px 40px rgba(0,0,0,0.12);
    }

    .deal-card.featured {
      grid-column: span 2;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      align-items: center;
    }

    .deal-badge {
      position: absolute;
      top: 1rem;
      left: 1rem;
      background: linear-gradient(135deg, #ff6b6b, #ff4444);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 700;
      z-index: 2;
    }

    .deal-image {
      text-align: center;
      margin-bottom: 1rem;
    }

    .deal-image img {
      width: 100%;
      height: 200px;
      object-fit: contain;
      transition: transform 0.3s ease;
    }

    .deal-card:hover .deal-image img {
      transform: scale(1.05);
    }

    .deal-content {
      flex: 1;
    }

    .deal-name {
      font-size: 1.1rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: #2d2d2d;
      line-height: 1.4;
    }

    .deal-prices {
      margin-bottom: 1rem;
    }

    .current-price {
      font-size: 1.5rem;
      font-weight: 800;
      color: #2d2d2d;
      display: block;
    }

    .original-price {
      font-size: 1rem;
      color: #999;
      text-decoration: line-through;
    }

    .deal-shipping {
      margin-bottom: 1.5rem;
    }

    .shipping-badge {
      background: #00a650;
      color: white;
      padding: 0.4rem 0.8rem;
      border-radius: 4px;
      font-size: 0.8rem;
      font-weight: 600;
    }

    .deal-actions {
      display: flex;
      gap: 0.75rem;
    }

    .buy-btn {
      flex: 1;
      background: #2968c8;
      color: white;
      border: none;
      padding: 0.75rem 1rem;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .buy-btn:hover {
      background: #1e5bb7;
      transform: translateY(-1px);
    }

    .cart-btn {
      background: #f8f9fa;
      border: 1px solid #e8e8e8;
      padding: 0.75rem;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .cart-btn:hover {
      background: #e9ecef;
      transform: scale(1.1);
    }

    .benefits-section {
      padding: 4rem 0;
      background: white;
    }

    .benefits-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }

    .benefit-card {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      padding: 2rem;
      background: #f8f9fa;
      border-radius: 16px;
      transition: all 0.3s ease;
    }

    .benefit-card:hover {
      background: white;
      transform: translateY(-4px);
      box-shadow: 0 8px 25px rgba(0,0,0,0.1);
    }

    .benefit-icon {
      font-size: 3rem;
      flex-shrink: 0;
    }

    .benefit-content h3 {
      margin: 0 0 0.5rem 0;
      font-weight: 600;
      color: #2d2d2d;
    }

    .benefit-content p {
      margin: 0;
      color: #666;
    }

    .newsletter-section {
      padding: 4rem 0;
      background: linear-gradient(135deg, #2968c8 0%, #1e5bb7 100%);
      color: white;
      text-align: center;
    }

    .newsletter-content h2 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }

    .newsletter-content p {
      font-size: 1.25rem;
      opacity: 0.9;
      margin-bottom: 2rem;
    }

    .newsletter-form {
      display: flex;
      max-width: 400px;
      margin: 0 auto;
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 8px 25px rgba(0,0,0,0.2);
    }

    .email-input {
      flex: 1;
      padding: 1rem;
      border: none;
      outline: none;
      font-size: 1rem;
      color: #333;
    }

    .subscribe-btn {
      background: #00a650;
      color: white;
      border: none;
      padding: 1rem 2rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.3s;
    }

    .subscribe-btn:hover {
      background: #008c45;
    }

    @keyframes float {
      0%, 100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-20px);
      }
    }

    /* Responsivo */
    @media (max-width: 768px) {
      .header-content {
        flex-direction: column;
        gap: 1rem;
      }

      .search-section {
        max-width: 100%;
        order: 2;
        width: 100%;
      }

      .main-nav {
        order: 3;
        gap: 1.5rem;
      }

      .hero-content {
        grid-template-columns: 1fr;
        gap: 2rem;
        text-align: center;
      }

      .hero-title {
        font-size: 2.5rem;
      }

      .hero-actions {
        justify-content: center;
        flex-wrap: wrap;
      }

      .hero-visual {
        height: 200px;
      }

      .floating-card {
        padding: 1rem;
        min-width: 100px;
      }

      .floating-card h4 {
        font-size: 0.9rem;
      }

      .floating-card p {
        font-size: 0.8rem;
      }

      .deal-card.featured {
        grid-column: span 1;
        grid-template-columns: 1fr;
      }

      .categories-grid {
        grid-template-columns: repeat(3, 1fr);
      }

      .benefits-grid {
        grid-template-columns: 1fr;
      }

      .newsletter-form {
        flex-direction: column;
      }

      .email-input, .subscribe-btn {
        width: 100%;
      }
    }

    @media (max-width: 480px) {
      .header-content {
        flex-direction: row;
        flex-wrap: wrap;
      }

      .logo-section {
        order: 1;
      }

      .main-nav {
        order: 2;
        gap: 1rem;
      }

      .search-section {
        order: 3;
      }

      .nav-link .nav-text {
        display: none;
      }

      .categories-grid {
        grid-template-columns: repeat(2, 1fr);
      }

      .deals-grid {
        grid-template-columns: 1fr;
      }

      .section-title {
        font-size: 2rem;
      }
    }
  `]
})
export class HomeComponent implements OnInit {
  private carrinhoService = inject(CarrinhoService);

  quantidadeItens = 0;

  ngOnInit() {
    this.carrinhoService.carrinho$.subscribe(() => {
      this.quantidadeItens = this.carrinhoService.obterQuantidadeTotal();
    });
  }

  categories = [
    { name: 'Celulares', icon: '📱' },
    { name: 'Eletrônicos', icon: '💻' },
    { name: 'Áudio', icon: '🎧' },
    { name: 'Casa', icon: '🏠' },
    { name: 'Moda', icon: '👕' },
    { name: 'Esportes', icon: '⚽' },
    { name: 'Beleza', icon: '💄' },
    { name: 'Livros', icon: '📚' }
  ];

  deals = [
    {
      id: 1,
      name: 'Smartphone Android 128GB - Tela 6.7" - Câmera Tripla 48MP',
      currentPrice: 'R$ 1.299',
      originalPrice: 'R$ 1.599',
      discount: '19% OFF',
      freeShipping: true,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
      descricao: 'Smartphone Android com 128GB de armazenamento',
      estoque: 10,
      categoria: 'Celulares',
      ativo: true
    },
    {
      id: 2,
      name: 'Fone Bluetooth Cancelamento de Ruído Ativo - 30h Bateria',
      currentPrice: 'R$ 299',
      originalPrice: 'R$ 399',
      discount: '25% OFF',
      freeShipping: true,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
      descricao: 'Fone Bluetooth com cancelamento de ruído ativo',
      estoque: 15,
      categoria: 'Áudio',
      ativo: true
    },
    {
      id: 3,
      name: 'Notebook Gamer RTX 3050 - 16GB RAM - SSD 512GB',
      currentPrice: 'R$ 4.599',
      originalPrice: 'R$ 5.199',
      discount: '12% OFF',
      freeShipping: true,
      image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400',
      descricao: 'Notebook Gamer com RTX 3050',
      estoque: 5,
      categoria: 'Eletrônicos',
      ativo: true
    },
    {
      id: 4,
      name: 'Smart TV 55" 4K UHD - Android TV - 3 HDMI',
      currentPrice: 'R$ 2.399',
      originalPrice: 'R$ 2.899',
      discount: '17% OFF',
      freeShipping: true,
      image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400',
      descricao: 'Smart TV 55" 4K UHD com Android TV',
      estoque: 8,
      categoria: 'Eletrônicos',
      ativo: true
    }
  ];

  addToCart(deal: any): void {
    const produto: Produto = {
      id: deal.id,
      nome: deal.name,
      descricao: deal.descricao,
      preco: this.extractPrice(deal.currentPrice),
      estoque: deal.estoque,
      categoria: deal.categoria,
      imagemUrl: deal.image,
      ativo: deal.ativo
    };

    this.carrinhoService.adicionarAoCarrinho(produto);
  }

  subscribeNewsletter(email: string): void {
    if (email && this.isValidEmail(email)) {
      alert(`Obrigado por se cadastrar com o email: ${email}`);
    } else {
      alert('Por favor, insira um email válido.');
    }
  }

  private extractPrice(priceString: string): number {
    const numericString = priceString.replace(/[^\d,]/g, '').replace(',', '.');
    return parseFloat(numericString) || 0;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
