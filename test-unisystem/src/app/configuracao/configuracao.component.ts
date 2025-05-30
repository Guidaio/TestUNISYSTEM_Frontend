import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-configuracao',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, NgxMaskDirective],
  providers: [provideNgxMask()],
  templateUrl: './configuracao.component.html',
  styleUrls: ['./configuracao.component.scss']
})
export class ConfiguracaoComponent implements OnInit {
  configForm: FormGroup;
  empresaCadastrada = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.configForm = this.fb.group({
      tipoEmpresa: ['', Validators.required],
      nomeEmpresa: ['', Validators.required],
      cnpj: ['', [Validators.required, Validators.minLength(14)]],
      cep: ['', [Validators.required, Validators.minLength(8)]],
      endereco: [{ value: '', disabled: true }],
      bairro: [{ value: '', disabled: true }],
      cidade: [{ value: '', disabled: true }],
      estado: [{ value: '', disabled: true }],
      complemento: [{ value: '', disabled: true }],
      celular: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      nomeAdm: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.minLength(11)]]
    });

    this.configForm.get('cep')?.valueChanges.subscribe(cep => {
      if (cep && cep.length === 8) {
        this.buscarCep(cep);
      }
    });
  }

  ngOnInit(): void {
    this.authService.isEmpresaCadastrada().subscribe(cadastrada => {
      this.empresaCadastrada = cadastrada;
      if (cadastrada) {
        this.carregarDadosEmpresa();
      }
    });
  }

  private carregarDadosEmpresa(): void {
    this.authService.getUserData().subscribe(userData => {
      if (userData && userData.empresa) {
        this.configForm.patchValue(userData.empresa);
      }
    });
  }

  private buscarCep(cep: string): void {
    this.configForm.get('endereco')?.enable();
    this.configForm.get('complemento')?.enable();
    this.configForm.get('bairro')?.enable();
    this.configForm.get('cidade')?.enable();
    this.configForm.get('estado')?.enable();

    this.http.get(`https://viacep.com.br/ws/${cep}/json/`).subscribe((data: any) => {
      if (!data.erro) {
        this.configForm.patchValue({
          endereco: data.logradouro,
          bairro: data.bairro,
          cidade: data.localidade,
          estado: data.uf
        });
      }
    });

    this.configForm.get('endereco')?.disable();
    this.configForm.get('complemento')?.disable();
    this.configForm.get('bairro')?.disable();
    this.configForm.get('cidade')?.disable();
    this.configForm.get('estado')?.disable();
  }

  onSubmit(): void {
    if (this.configForm.valid) {
      const empresaData = this.configForm.getRawValue();
      this.authService.getUserData().subscribe(userData => {
        if (userData) {
          userData.empresa = empresaData;
          this.authService.setEmpresaCadastrada(true);
          this.router.navigate(['/home']);
        }
      });
    }
  }

  isFormValid(): boolean {
    return this.configForm.valid;
  }
} 