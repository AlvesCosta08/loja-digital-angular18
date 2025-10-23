import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProdutoService } from '../../../core/services/produto.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="container">
      <h2>Adicionar Novo Produto</h2>
      <form [formGroup]="productForm" (ngSubmit)="onSubmit()" enctype="multipart/form-data">
        <input formControlName="nome" placeholder="Nome do produto" required />
        <textarea formControlName="descricao" placeholder="Descrição" required></textarea>
        <input formControlName="preco" type="number" step="0.01" placeholder="Preço (R$)" required />

        <label for="file">Arquivo do produto (opcional)</label>
        <input id="file" type="file" (change)="onFileSelected($event)" accept=".pdf,.zip,.mp4,.jpg,.png" />

        <button type="submit" [disabled]="productForm.invalid">
          Salvar Produto
        </button>
      </form>
    </div>
  `,
  styles: [`
    .container {
      max-width: 600px;
      margin: 2rem auto;
      padding: 1.5rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    input, textarea, button {
      padding: 12px;
      font-size: 16px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    button {
      background: #1976d2;
      color: white;
      cursor: pointer;
    }
    button:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
    label {
      font-weight: bold;
    }
  `]
})
export class ProductFormComponent implements OnInit {
  productForm!: any; // Vamos inicializar no ngOnInit
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  private inicializarFormulario(): void {
    this.productForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      descricao: ['', [Validators.required, Validators.minLength(10)]],
      preco: [0, [Validators.required, Validators.min(0.01)]]
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit() {
    if (this.productForm.invalid) return;

    const { nome, descricao, preco } = this.productForm.value;

    if (!nome || !descricao || preco == null) return;

    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('nome', nome);
      formData.append('descricao', descricao);
      formData.append('preco', preco.toString());
      formData.append('arquivo', this.selectedFile);

      this.produtoService.criarComArquivo(formData).subscribe({
        next: () => {
          alert('✅ Produto com arquivo cadastrado com sucesso!');
          this.router.navigate(['/produtos']);
        },
        error: () => {
          alert('❌ Falha ao salvar produto com arquivo.');
        }
      });
    } else {
      this.produtoService.criar({ nome, descricao, preco }).subscribe({
        next: () => {
          alert('✅ Produto cadastrado com sucesso!');
          this.router.navigate(['/produtos']);
        },
        error: () => {
          alert('❌ Falha ao salvar produto.');
        }
      });
    }
  }
}
