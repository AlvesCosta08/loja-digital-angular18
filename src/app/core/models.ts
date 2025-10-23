export interface Produto {
  id: number;
  nome: string;
  preco: number;
  descricao: string;
}

export interface ItemPedido {
  produto: Produto;
  quantidade: number;
}

export interface Pedido {
  id: number;
  data: string;
  status: 'PENDENTE' | 'PAGO' | 'ENTREGUE';
  itens: ItemPedido[];
}
