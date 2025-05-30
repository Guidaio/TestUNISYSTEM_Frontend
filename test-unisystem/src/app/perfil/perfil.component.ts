import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule, HttpClientModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  perfilForm: FormGroup;
  showSenhaAtual = false;
  showNovaSenha = false;
  showConfirmarSenha = false;
  senhasCombinam = false;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private http: HttpClient
  ) {
    this.perfilForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senhaAtual: ['', [Validators.required, Validators.minLength(6)]],
      novaSenha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', [Validators.required]]
    }, {
      validators: this.senhasIguais
    });

    this.perfilForm.get('novaSenha')?.valueChanges.subscribe(() => {
      this.validarSenhas();
    });
    this.perfilForm.get('confirmarSenha')?.valueChanges.subscribe(() => {
      this.validarSenhas();
    });
  }

  ngOnInit(): void {
    this.authService.getUserData().subscribe(userData => {
      if (userData) {
        this.perfilForm.patchValue({
          nome: userData.nome,
          email: userData.email
        });
      }
    });
  }

  senhasIguais(group: FormGroup) {
    const novaSenha = group.get('novaSenha')?.value;
    const confirmarSenha = group.get('confirmarSenha')?.value;
    return novaSenha === confirmarSenha ? null : { senhasDiferentes: true };
  }

  validarSenhas() {
    const novaSenha = this.perfilForm.get('novaSenha')?.value;
    const confirmarSenha = this.perfilForm.get('confirmarSenha')?.value;
    
    if (novaSenha && confirmarSenha) {
      this.senhasCombinam = novaSenha === confirmarSenha;
      if (!this.senhasCombinam) {
        this.perfilForm.setErrors({ senhasDiferentes: true });
      } else {
        this.perfilForm.setErrors(null);
      }
    } else {
      this.senhasCombinam = false;
    }
  }

  toggleSenhaAtual(): void {
    this.showSenhaAtual = !this.showSenhaAtual;
  }

  toggleNovaSenha(): void {
    this.showNovaSenha = !this.showNovaSenha;
  }

  toggleConfirmarSenha(): void {
    this.showConfirmarSenha = !this.showConfirmarSenha;
  }

  onSubmit(): void {
    if (this.perfilForm.valid && this.senhasCombinam) {
      const { nome, email, senhaAtual, novaSenha } = this.perfilForm.value;
      
      this.authService.getUserData().subscribe(userData => {
        if (userData && userData.senha === senhaAtual) {
          const updatedUser = {
            ...userData,
            nome,
            email,
            senha: novaSenha
          };
          
          this.authService.cadastrarUsuario(updatedUser);
          this.router.navigate(['/home']);
        } else {
          this.perfilForm.get('senhaAtual')?.setErrors({ senhaIncorreta: true });
        }
      });
    }
  }

  logout(): void {
    this.authService.logout();
  }
} 