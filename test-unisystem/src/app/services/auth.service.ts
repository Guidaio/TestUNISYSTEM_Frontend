import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private userDataSubject = new BehaviorSubject<any>(null);
  private empresaCadastradaSubject = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {
    const userData = localStorage.getItem('userData');
    if (userData) {
      this.userDataSubject.next(JSON.parse(userData));
      this.isAuthenticatedSubject.next(true);
      this.empresaCadastradaSubject.next(JSON.parse(userData).empresaCadastrada || false);
    }
  }

  login(email: string, senha: string): boolean {
    const userData = localStorage.getItem('userData');
    let isValid = false;

    if (userData) {
      const user = JSON.parse(userData);
      isValid = user.email === email && user.senha === senha;
    } else {
      const defaultUser = {
        nome: 'Usuário Teste',
        email: 'teste@teste.com',
        senha: '123456',
        empresaCadastrada: false
      };
      localStorage.setItem('userData', JSON.stringify(defaultUser));
      isValid = email === defaultUser.email && senha === defaultUser.senha;
    }

    if (isValid) {
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      this.userDataSubject.next(userData);
      this.isAuthenticatedSubject.next(true);
      this.empresaCadastradaSubject.next(userData.empresaCadastrada || false);
    }

    return isValid;
  }

  logout(): void {
    const userData = this.userDataSubject.value;
    localStorage.setItem('userData', JSON.stringify(userData));
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  isEmailInUse(email: string): boolean {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      return user.email === email;
    }
    return false;
  }

  cadastrarUsuario(userData: any): boolean {
    if (this.isEmailInUse(userData.email)) {
      return false;
    }

    localStorage.removeItem('userData');
    const newUser = {
      ...userData,
      empresaCadastrada: false
    };
    localStorage.setItem('userData', JSON.stringify(newUser));
    this.userDataSubject.next(newUser);
    this.isAuthenticatedSubject.next(true);
    this.empresaCadastradaSubject.next(false);
    return true;
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  getUserData(): Observable<any> {
    return this.userDataSubject.asObservable();
  }

  isEmpresaCadastrada(): Observable<boolean> {
    return this.empresaCadastradaSubject.asObservable();
  }

  setEmpresaCadastrada(value: boolean): void {
    this.empresaCadastradaSubject.next(value);
    const userData = this.userDataSubject.value;
    if (userData) {
      userData.empresaCadastrada = value;
      this.userDataSubject.next(userData);
      localStorage.setItem('userData', JSON.stringify(userData));
    }
  }
} 