// src/app/features/admin/product-form/product-form.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProdutoService } from '../../../core/services/produto.service';
import { Produto } from '../../../core/models';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>{{ editando ? 'Editar' : 'Adicionar' }} Produto</h2>

      <form (ngSubmit)="onSubmit()" #productForm="ngForm">
        <div class="form-group">
          <label for="nome">Nome:</label>
          <input type="text" id="nome" name="nome" [(ngModel)]="produto.nome" required>
        </div>

        <div class="form-group">
          <label for="descricao">Descrição:</label>
          <textarea id="descricao" name="descricao" [(ngModel)]="produto.descricao" required></textarea>
        </div>

        <div class="form-group">
          <label for="preco">Preço:</label>
          <input type="number" id="preco" name="preco" [(ngModel)]="produto.preco" step="0.01" required>
        </div>

        <div class="form-group">
          <label for="estoque">Estoque:</label>
          <input type="number" id="estoque" name="estoque" [(ngModel)]="produto.estoque" required>
        </div>

        <div class="form-group">
          <label for="categoria">Categoria:</label>
          <input type="text" id="categoria" name="categoria" [(ngModel)]="produto.categoria" required>
        </div>

        <div class="form-group">
          <label for="imagemUrl">URL da Imagem:</label>
          <input type="text" id="imagemUrl" name="imagemUrl" [(ngModel)]="produto.imagemUrl">
        </div>

        <div class="form-actions">
          <button type="submit" class="btn btn-primary">
            {{ editando ? 'Atualizar' : 'Criar' }} Produto
          </button>
          <button type="button" class="btn btn-secondary" (click)="cancelar()">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .container {
      max-width: 600px;
      margin: 2rem auto;
      padding: 2rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    h2 {
      color: #333;
      margin-bottom: 2rem;
      text-align: center;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 600;
      color: #333;
    }

    input, textarea {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      box-sizing: border-box;
    }

    textarea {
      height: 100px;
      resize: vertical;
    }

    input:focus, textarea:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.1);
    }

    .form-actions {
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
      margin-top: 2rem;
    }

    .btn {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn-primary {
      background: #667eea;
      color: white;
    }

    .btn-primary:hover {
      background: #5a6fd8;
      transform: translateY(-1px);
    }

    .btn-secondary {
      background: #6c757d;
      color: white;
    }

    .btn-secondary:hover {
      background: #5a6268;
      transform: translateY(-1px);
    }

    @media (max-width: 768px) {
      .container {
        margin: 1rem;
        padding: 1.5rem;
      }

      .form-actions {
        flex-direction: column;
      }

      .btn {
        width: 100%;
      }
    }
  `]
})
export class ProductFormComponent {
  private produtoService = inject(ProdutoService);
  private router = inject(Router);

  produto: Produto = {
    nome: '',
    descricao: '',
    preco: 0,
    estoque: 0,
    categoria: '',
    imagemUrl: '',
    ativo: true
  };

  editando = false;

  onSubmit(): void {
    if (this.editando && this.produto.id) {
      // Lógica para editar
      this.produtoService.atualizarProduto(this.produto.id, this.produto).subscribe({
        next: () => {
          alert('Produto atualizado com sucesso!');
          this.router.navigate(['/catalog']);
        },
        error: (error: any) => {
          console.error('Erro ao atualizar produto:', error);
          alert('Erro ao atualizar produto. Tente novamente.');
        }
      });
    } else {
      // Lógica para criar novo produto
      this.produtoService.criarProduto(this.produto).subscribe({
        next: () => {
          alert('Produto criado com sucesso!');
          this.router.navigate(['/catalog']);
        },
        error: (error: any) => {
          console.error('Erro ao criar produto:', error);
          alert('Erro ao criar produto. Tente novamente.');
        }
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/catalog']);
  }
}
