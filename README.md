# Loja Digital – Frontend (Angular 17+)

Aplicação frontend de um e-commerce moderno, desenvolvida com **Angular 17+**, **TypeScript**, **RxJS** e **Standalone Components**. Totalmente integrada a um backend Spring Boot via JWT e proxy de desenvolvimento.

## 🚀 Funcionalidades

- 🎯 **Catálogo de Produtos**: Navegação e busca
- 🛒 **Carrinho de Compras**: Adicionar, remover e atualizar quantidades
- 💳 **Checkout**: Finalização de compra com validação
- 🔐 **Autenticação**: Login e registro com JWT
- ⚙️ **Área Administrativa**: Gerenciamento de produtos e categorias (protegida)
- 📱 **Design Responsivo**: Funciona em mobile, tablet e desktop

## 🛠 Tecnologias

- **Angular 17+** (Standalone Components)
- **TypeScript**
- **RxJS** (programação reativa)
- **Angular Router** (navegação SPA)
- **CSS3** com **Flexbox** e **Grid**
- **JWT Interceptor** e **Route Guards**
- **Proxy Dev** para backend Spring Boot

## ⚙️ Pré-requisitos

- Node.js 18+
- Angular CLI 17+
- Backend Spring Boot rodando em `http://localhost:8080`

## 📥 Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/AlvesCosta08/loja-digital-frontend.git
   cd loja-digital-frontend

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
