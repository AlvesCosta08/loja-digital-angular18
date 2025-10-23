// src/app/core/models.ts
export interface Produto {
  id?: number;
  nome: string;
  descricao: string;
  preco: number;
  estoque: number;
  categoria: string;
  imagemUrl?: string;
  ativo: boolean;
}

export interface Pedido {
  id?: number;
  itens: ItemPedido[];
  total: number;
  status: string;
  dataCriacao?: Date;
  clienteId?: number;
}

export interface ItemPedido {
  produtoId: number;
  quantidade: number;
  precoUnitario: number;
  produto?: Produto;
}

export interface Usuario {
  id?: number;
  email: string;
  nome: string;
  token?: string;
}

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface RegistroRequest {
  nome: string;
  email: string;
  senha: string;
}

// Interfaces do Carrinho
export interface ItemCarrinho {
  produtoId: number;
  quantidade: number;
  precoUnitario: number;
  produto?: Produto;
}

export interface Carrinho {
  itens: ItemCarrinho[];
  total: number;
  quantidadeItens: number;
}
