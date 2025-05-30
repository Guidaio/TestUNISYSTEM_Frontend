import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfiguracaoComponent } from './configuracao.component';
import { AuthService } from '../services/auth.service';
import { BehaviorSubject } from 'rxjs';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

describe('ConfiguracaoComponent', () => {
  let component: ConfiguracaoComponent;
  let fixture: ComponentFixture<ConfiguracaoComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isEmpresaCadastrada', 'getUserData', 'setEmpresaCadastrada']);
    authServiceSpy.isEmpresaCadastrada.and.returnValue(new BehaviorSubject(false));
    authServiceSpy.getUserData.and.returnValue(new BehaviorSubject(null));

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NgxMaskDirective,
        ConfiguracaoComponent
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        provideNgxMask()
      ]
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguracaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar o formulário com valores vazios', () => {
    const form = component.configForm;
    expect(form.get('tipoEmpresa')?.value).toBe('');
    expect(form.get('nomeEmpresa')?.value).toBe('');
    expect(form.get('cnpj')?.value).toBe('');
    expect(form.get('cep')?.value).toBe('');
    expect(form.get('endereco')?.value).toBe('');
    expect(form.get('bairro')?.value).toBe('');
    expect(form.get('cidade')?.value).toBe('');
    expect(form.get('estado')?.value).toBe('');
    expect(form.get('complemento')?.value).toBe('');
    expect(form.get('celular')?.value).toBe('');
    expect(form.get('email')?.value).toBe('');
    expect(form.get('nomeAdm')?.value).toBe('');
    expect(form.get('cpf')?.value).toBe('');
  });

  it('deve validar campos obrigatórios', () => {
    const form = component.configForm;
    expect(form.valid).toBeFalsy();
    expect(form.get('tipoEmpresa')?.errors?.['required']).toBeTruthy();
    expect(form.get('nomeEmpresa')?.errors?.['required']).toBeTruthy();
    expect(form.get('cnpj')?.errors?.['required']).toBeTruthy();
    expect(form.get('celular')?.errors?.['required']).toBeTruthy();
    expect(form.get('email')?.errors?.['required']).toBeTruthy();
    expect(form.get('nomeAdm')?.errors?.['required']).toBeTruthy();
    expect(form.get('cpf')?.errors?.['required']).toBeTruthy();
  });

  it('deve validar formato do email', () => {
    const form = component.configForm;
    form.patchValue({
      email: 'email-invalido'
    });
    expect(form.get('email')?.errors?.['email']).toBeTruthy();

    form.patchValue({
      email: 'email@valido.com'
    });
    expect(form.get('email')?.errors?.['email']).toBeFalsy();
  });

  it('deve validar tamanho do CNPJ', () => {
    const form = component.configForm;
    form.patchValue({
      cnpj: '123'
    });
    expect(form.get('cnpj')?.errors?.['minlength']).toBeTruthy();

    form.patchValue({
      cnpj: '12345678901234'
    });
    expect(form.get('cnpj')?.errors?.['minlength']).toBeFalsy();
  });

  it('deve validar tamanho do CEP', () => {
    const form = component.configForm;
    form.patchValue({
      cep: '123'
    });
    expect(form.get('cep')?.errors?.['minlength']).toBeTruthy();

    form.patchValue({
      cep: '12345678'
    });
    expect(form.get('cep')?.errors?.['minlength']).toBeFalsy();
  });

  it('deve validar tamanho do telefone', () => {
    const form = component.configForm;
    form.patchValue({
      celular: '123'
    });
    expect(form.get('celular')?.errors?.['minlength']).toBeTruthy();

    form.patchValue({
      celular: '1234567890'
    });
    expect(form.get('celular')?.errors?.['minlength']).toBeFalsy();
  });

  it('deve carregar dados da empresa se já estiver cadastrada', () => {
    const mockEmpresaData = {
      tipoEmpresa: 'LTDA',
      nomeEmpresa: 'Empresa Teste',
      cnpj: '12345678901234',
      cep: '12345678',
      endereco: 'Rua Teste',
      bairro: 'Centro',
      cidade: 'São Paulo',
      estado: 'SP',
      complemento: 'Sala 1',
      celular: '1234567890',
      email: 'teste@teste.com',
      nomeAdm: 'Administrador Teste',
      cpf: '12345678901'
    };

    (authService.isEmpresaCadastrada as jasmine.Spy).and.returnValue(new BehaviorSubject(true));
    (authService.getUserData as jasmine.Spy).and.returnValue(new BehaviorSubject({ empresa: mockEmpresaData }));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.configForm.get('tipoEmpresa')?.value).toBe(mockEmpresaData.tipoEmpresa);
    expect(component.configForm.get('nomeEmpresa')?.value).toBe(mockEmpresaData.nomeEmpresa);
    expect(component.configForm.get('cnpj')?.value).toBe(mockEmpresaData.cnpj);
    expect(component.configForm.get('cep')?.value).toBe(mockEmpresaData.cep);
    expect(component.configForm.get('endereco')?.value).toBe(mockEmpresaData.endereco);
    expect(component.configForm.get('bairro')?.value).toBe(mockEmpresaData.bairro);
    expect(component.configForm.get('cidade')?.value).toBe(mockEmpresaData.cidade);
    expect(component.configForm.get('estado')?.value).toBe(mockEmpresaData.estado);
    expect(component.configForm.get('complemento')?.value).toBe(mockEmpresaData.complemento);
    expect(component.configForm.get('celular')?.value).toBe(mockEmpresaData.celular);
    expect(component.configForm.get('email')?.value).toBe(mockEmpresaData.email);
    expect(component.configForm.get('nomeAdm')?.value).toBe(mockEmpresaData.nomeAdm);
    expect(component.configForm.get('cpf')?.value).toBe(mockEmpresaData.cpf);
  });
}); 