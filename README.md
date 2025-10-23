# Loja Digital Frontend

Frontend Angular para sistema de e-commerce.

## Funcionalidades

- Catálogo de produtos
- Carrinho de compras
- Checkout
- Autenticação de usuários
- Área administrativa

## Desenvolvimento

### Pré-requisitos
- Node.js 18+
- Angular CLI 17+

### Instalação
```bash
npm install


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
