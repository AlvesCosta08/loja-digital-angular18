Loja Digital 
Frontend Angular para sistema de e-commerce desenvolvido com Angular 17+ e boas práticas de desenvolvimento.

🚀 Funcionalidades
🎯 Catálogo de Produtos - Navegação e busca de produtos

🛒 Carrinho de Compras - Gerenciamento de itens e quantidades

💳 Checkout - Processo de finalização de compra

🔐 Autenticação - Login e registro de usuários

⚙️ Área Administrativa - Gerenciamento de produtos e pedidos

📱 Design Responsivo - Experiência otimizada para todos os dispositivos

🛠 Tecnologias
Angular 17+ - Framework principal

TypeScript - Linguagem de programação

RxJS - Programação reativa

Standalone Components - Arquitetura moderna do Angular

CSS3 - Estilização com Grid e Flexbox

Angular Router - Navegação SPA

📋 Pré-requisitos
Node.js 18+ Download

Angular CLI 17+

npm ou yarn

⚡ Instalação e Configuração
# Clonar repositório
git clone <repository-url>
cd loja-digital-frontend

# Instalar dependências
npm install

# Instalar Angular CLI globalmente (se necessário)
npm install -g @angular/cli@17

2. Configuração do Ambiente
O projeto espera um backend Spring Boot rodando em http://localhost:8080.
O arquivo src/proxy.conf.json está configurado para redirecionar requisições da API:

{
  "/api": {
    "target": "http://localhost:8080",
    "secure": false
  }
}

3. Executar Aplicação
# Desenvolvimento
npm start
# ou
ng serve

# A aplicação estará disponível em: http://localhost:4200

4. Build para Produção

# Build de produção
npm run build

# Build com otimizações
ng build --configuration=production


🌐 Backend Integration
Configuração da API
A aplicação está configurada para se comunicar com um backend Spring Boot:

URL Base: http://localhost:8080

Endpoint API: /api

Autenticação: JWT Token

// Autenticação
POST /api/auth/login
POST /api/auth/register

// Produtos
GET    /api/produtos
GET    /api/produtos/{id}
POST   /api/produtos
PUT    /api/produtos/{id}
DELETE /api/produtos/{id}

// Carrinho
GET    /api/carrinho
POST   /api/carrinho/adicionar
PUT    /api/carrinho/atualizar
DELETE /api/carrinho/remover/{id}

// Pedidos
GET    /api/pedidos
POST   /api/pedidos
GET    /api/pedidos/{id}



🎨 Características do Design
Paleta de Cores: Azul corporativo (#2968c8) com gradientes

Tipografia: Sistema de fontes responsivo

Layout: Grid e Flexbox para responsividade

Componentes: Cards flutuantes com animações

Interatividade: Hover effects e transições suaves

📱 Responsividade
A aplicação é totalmente responsiva com breakpoints para:

Desktop: > 1200px

Tablet: 768px - 1199px

Mobile: < 767px

🔒 Segurança
Guards de rota para áreas protegidas

Interceptor de autenticação JWT

Validação de formulários

Sanitização de dados

🚀 Deploy
Build para Produção

npm run build


Servidores Recomendados
NGINX

Apache HTTP Server

Azure Static Web Apps

Vercel

Netlify


🤝 Contribuição
Fork o projeto

Crie uma branch para sua feature (git checkout -b feature/AmazingFeature)

Commit suas mudanças (git commit -m 'Add some AmazingFeature')

Push para a branch (git push origin feature/AmazingFeature)

Abra um Pull Request

```bash
LOJA-DIGITAL-FRONTEND/
├── .angular/                ← Configurações internas do Angular CLI
├── .vscode/                 ← Configurações do VS Code (launch.json, settings.json)
├── node_modules/            ← Pacotes instalados (não commitado)
├── public/                  ← Assets estáticos (favicon.ico, robots.txt, etc.)
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── guards/
│   │   │   │   └── auth.guard.ts
│   │   │   ├── interceptors/
│   │   │   │   └── auth.interceptor.ts
│   │   │   ├── services/
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── pedido.service.ts
│   │   │   │   └── produto.service.ts
│   │   │   └── models.ts      ← Interfaces centralizadas (Produto, Pedido, etc.)
│   │   ├── features/
│   │   │   ├── admin/
│   │   │   │   └── product-form/
│   │   │   │       └── product-form.component.ts
│   │   │   ├── auth/
│   │   │   │   ├── login/
│   │   │   │   │   └── login.component.ts
│   │   │   │   └── register/
│   │   │   │       └── register.component.ts
│   │   │   ├── cart/
│   │   │   │   ├── cart-summary/
│   │   │   │   │   └── cart-summary.component.ts
│   │   │   │   └── checkout/
│   │   │   │       └── checkout.component.ts
│   │   │   ├── catalog/
│   │   │   │   └── product-list/
│   │   │   │       └── product-list.component.ts
│   │   │   └── home/
│   │   │       └── home.component.ts
│   │   ├── shared/            ← Pasta para componentes reutilizáveis (vazia por enquanto)
│   │   ├── app.config.ts      ← Configuração global (providers, interceptors)
│   │   ├── app.routes.ts      ← Rotas da aplicação
│   │   ├── app.component.ts   ← Componente raiz
│   │   ├── app.html           ← Template raiz (opcional — pode ser removido)
│   │   └── app.scss           ← Estilos globais
│   ├── main.ts                ← Entry point do app
│   ├── index.html             ← Página principal
│   ├── styles.scss            ← Estilos globais (importado em angular.json)
│   ├── proxy.conf.json        ← Proxy para backend Spring Boot
│   └── assets/                ← Pasta de assets (se existir)
├── .editorconfig              ← Configurações de estilo de código
├── .gitignore                 ← Arquivos ignorados pelo Git
├── angular.json               ← Configuração do projeto Angular (build, serve, test)
├── package-lock.json          ← Versões exatas dos pacotes
├── package.json               ← Dependências e scripts
├── README.md                  ← Documentação do projeto (recomendado!)
├── tsconfig.app.json          ← Configuração TypeScript para app
├── tsconfig.json              ← Configuração TypeScript raiz
└── tsconfig.spec.json         ← Configuração TypeScript para testese


Executar
npm start


Build

npm run build


Estrutura do Projeto
src/app/core/ - Serviços, guards e interceptors

src/app/features/ - Módulos de funcionalidades

src/app/shared/ - Componentes reutilizáveis


Backend
O projeto espera um backend Spring Boot rodando em http://localhost:8080
