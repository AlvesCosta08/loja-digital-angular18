import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Produto } from '../models'; // ✅ Importa do models.ts

@Injectable({ providedIn: 'root' })
export class ProdutoService {
  private produtos: Produto[] = [ /* ... */ ];

  listar(): Observable<Produto[]> {
    return of(this.produtos);
  }

  criar(dto: Omit<Produto, 'id'>): Observable<Produto> {
    const novo: Produto = { id: Date.now(), ...dto };
    this.produtos.push(novo);
    return of(novo);
  }

  criarComArquivo(formData: FormData): Observable<Produto> {
    const nome = formData.get('nome') as string;
    const descricao = formData.get('descricao') as string;
    const preco = parseFloat(formData.get('preco') as string);
    return this.criar({ nome, descricao, preco });
  }
}
