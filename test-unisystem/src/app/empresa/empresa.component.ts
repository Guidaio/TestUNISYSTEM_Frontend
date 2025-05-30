import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empresa',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="empresa-container">
      <div class="empresa-content">
        <div class="empresa-header">
          <div class="header-info">
            <h2>{{ empresa?.nomeEmpresa }}</h2>
            <span class="tipo-empresa">{{ empresa?.tipoEmpresa }}</span>
          </div>
          <button class="btn-edit" (click)="editar()">
            <i class="fas fa-edit"></i> Editar
          </button>
        </div>

        <div class="empresa-info" *ngIf="empresa">
          <div class="info-section">
            <h3>Informações Gerais</h3>
            <div class="info-grid">
              <div class="info-group">
                <label>CNPJ</label>
                <span>{{ empresa.cnpj }}</span>
              </div>
              <div class="info-group">
                <label>Email</label>
                <span>{{ empresa.email }}</span>
              </div>
              <div class="info-group">
                <label>Celular</label>
                <span>{{ empresa.celular }}</span>
              </div>
            </div>
          </div>

          <div class="info-section">
            <h3>Endereço</h3>
            <div class="info-grid">
              <div class="info-group">
                <label>CEP</label>
                <span>{{ empresa.cep }}</span>
              </div>
              <div class="info-group">
                <label>Endereço</label>
                <span>{{ empresa.endereco }}</span>
              </div>
              <div class="info-group">
                <label>Bairro</label>
                <span>{{ empresa.bairro }}</span>
              </div>
              <div class="info-group">
                <label>Cidade</label>
                <span>{{ empresa.cidade }}</span>
              </div>
              <div class="info-group">
                <label>Estado</label>
                <span>{{ empresa.estado }}</span>
              </div>
              <div class="info-group" *ngIf="empresa.complemento">
                <label>Complemento</label>
                <span>{{ empresa.complemento }}</span>
              </div>
            </div>
          </div>

          <div class="info-section">
            <h3>Administrador</h3>
            <div class="info-grid">
              <div class="info-group">
                <label>Nome</label>
                <span>{{ empresa.nomeAdm }}</span>
              </div>
              <div class="info-group">
                <label>CPF</label>
                <span>{{ empresa.cpf }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .empresa-container {
      padding: 2rem;
      background-color: #f8f9fa;
      min-height: 100vh;
    }

    .empresa-content {
      max-width: 1000px;
      margin: 0 auto;
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .empresa-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 2px solid #e9ecef;

      .header-info {
        h2 {
          margin: 0;
          color: #2c3e50;
          font-size: 1.8rem;
        }

        .tipo-empresa {
          color: #6c757d;
          font-size: 1rem;
        }
      }

      .btn-edit {
        padding: 0.75rem 1.5rem;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.2s;
        font-size: 1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;

        &:hover {
          background-color: #0056b3;
          transform: translateY(-1px);
        }
      }
    }

    .info-section {
      margin-bottom: 2rem;
      padding: 1.5rem;
      background-color: #f8f9fa;
      border-radius: 8px;

      h3 {
        color: #2c3e50;
        margin: 0 0 1rem 0;
        font-size: 1.2rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid #dee2e6;
      }
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
    }

    .info-group {
      label {
        display: block;
        color: #6c757d;
        font-size: 0.9rem;
        margin-bottom: 0.25rem;
      }

      span {
        color: #2c3e50;
        font-size: 1.1rem;
        font-weight: 500;
      }
    }

    @media (max-width: 768px) {
      .empresa-container {
        padding: 1rem;
      }

      .empresa-content {
        padding: 1.5rem;
      }

      .info-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class EmpresaComponent implements OnInit {
  empresa: any;

  constructor(private router: Router) {}

  ngOnInit() {
    const empresa = localStorage.getItem('empresa');
    if (empresa) {
      this.empresa = JSON.parse(empresa);
    } else {
      this.router.navigate(['/configuracao']);
    }
  }

  editar() {
    this.router.navigate(['/configuracao']);
  }
} 