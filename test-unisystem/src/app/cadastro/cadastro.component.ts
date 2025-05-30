import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective, FontAwesomeModule],
  providers: [provideNgxMask()],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {
  cadastroForm: FormGroup;
  emailEmUso = false;
  cadastroSucesso = false;
  showSenha = false;
  showConfirmarSenha = false;
  senhasCombinam = false;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.cadastroForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', [Validators.required]],
      termos: [false, Validators.requiredTrue]
    }, {
      validators: this.senhasIguais
    });

    this.cadastroForm.get('email')?.valueChanges.subscribe(email => {
      if (email && this.cadastroForm.get('email')?.valid) {
        this.emailEmUso = this.authService.isEmailInUse(email);
      } else {
        this.emailEmUso = false;
      }
    });

    this.cadastroForm.get('senha')?.valueChanges.subscribe(() => {
      this.validarSenhas();
    });
    this.cadastroForm.get('confirmarSenha')?.valueChanges.subscribe(() => {
      this.validarSenhas();
    });
  }

  senhasIguais(group: FormGroup) {
    const senha = group.get('senha')?.value;
    const confirmarSenha = group.get('confirmarSenha')?.value;
    return senha === confirmarSenha ? null : { senhasDiferentes: true };
  }

  validarSenhas() {
    const senha = this.cadastroForm.get('senha')?.value;
    const confirmarSenha = this.cadastroForm.get('confirmarSenha')?.value;
    
    if (senha && confirmarSenha) {
      this.senhasCombinam = senha === confirmarSenha;
      if (!this.senhasCombinam) {
        this.cadastroForm.setErrors({ senhasDiferentes: true });
      } else {
        this.cadastroForm.setErrors(null);
      }
    } else {
      this.senhasCombinam = false;
    }
  }

  toggleSenha(): void {
    this.showSenha = !this.showSenha;
  }

  toggleConfirmarSenha(): void {
    this.showConfirmarSenha = !this.showConfirmarSenha;
  }

  onSubmit(): void {
    if (this.cadastroForm.valid && !this.emailEmUso) {
      const userData = {
        nome: this.cadastroForm.get('nome')?.value,
        email: this.cadastroForm.get('email')?.value,
        senha: this.cadastroForm.get('senha')?.value
      };

      const cadastroSucesso = this.authService.cadastrarUsuario(userData);
      
      if (cadastroSucesso) {
        this.cadastroSucesso = true;
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 2000);
      }
    }
  }
}
