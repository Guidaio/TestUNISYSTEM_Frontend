import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { BehaviorSubject } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated', 'isEmpresaCadastrada', 'logout']);
    authServiceSpy.isAuthenticated.and.returnValue(new BehaviorSubject(false));
    authServiceSpy.isEmpresaCadastrada.and.returnValue(new BehaviorSubject(false));

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FontAwesomeModule, AppComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar com valores padrão', () => {
    expect(component.isAuthenticated).toBeFalse();
    expect(component.isEmpresaCadastrada).toBeFalse();
    expect(component.isSidebarOpen).toBeTrue();
  });

  it('deve alternar o estado do sidebar', () => {
    expect(component.isSidebarOpen).toBeTrue();
    component.toggleSidebar();
    expect(component.isSidebarOpen).toBeFalse();
    component.toggleSidebar();
    expect(component.isSidebarOpen).toBeTrue();
  });

  it('deve chamar logout no authService', () => {
    component.logout();
    expect(authService.logout).toHaveBeenCalled();
  });

  it('deve permitir navegação para configuração independente do status da empresa', () => {
    expect(component.canNavigate('/configuracao')).toBeTrue();
  });

  it('deve permitir navegação para outras rotas apenas se a empresa estiver cadastrada', () => {
    expect(component.canNavigate('/home')).toBeFalse();
    (authService.isEmpresaCadastrada as jasmine.Spy).and.returnValue(new BehaviorSubject(true));
    component.ngOnInit();
    expect(component.canNavigate('/home')).toBeTrue();
  });
});
