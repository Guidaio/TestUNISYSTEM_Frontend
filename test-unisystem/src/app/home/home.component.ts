import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="home-container">
      <div class="home-content">
        <h1>Bem-vindo ao UniSystem</h1>
        <p class="welcome-message">Olá, {{ nomeUsuario }}!</p>
        <p class="subtitle">Seu sistema de gestão empresarial</p>
        
        <div class="action-buttons" *ngIf="!empresaCadastrada">
          <button class="btn-primary" (click)="irParaConfiguracao()">
            Iniciar Configuração
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      padding: 2rem;
      background-color: #f8f9fa;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .home-content {
      width: 100%;
      max-width: 800px;
      text-align: center;
      padding: 3rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

      h1 {
        color: #2c3e50;
        margin-bottom: 1rem;
        font-size: 2rem;
      }

      .welcome-message {
        color: #007bff;
        font-size: 1.2rem;
        margin-bottom: 0.5rem;
      }

      .subtitle {
        color: #6c757d;
        margin-bottom: 2rem;
        font-size: 1.1rem;
      }
    }

    .action-buttons {
      .btn-primary {
        padding: 0.75rem 2rem;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.2s;

        &:hover {
          background-color: #0056b3;
        }
      }
    }
  `]
})
export class HomeComponent implements OnInit {
  empresaCadastrada = false;
  nomeUsuario: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      this.router.navigate(['/cadastro']);
      return;
    }

    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.nomeUsuario = userData.nome || '';
    this.empresaCadastrada = localStorage.getItem('empresaCadastrada') === 'true';
  }

  irParaConfiguracao() {
    this.router.navigate(['/configuracao']);
  }
} 