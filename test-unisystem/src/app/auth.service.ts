import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor() {
    // Verificar se há dados de usuário no localStorage
    const userData = localStorage.getItem('userData');
    if (userData) {
      this.isLoggedInSubject.next(true);
    }
  }

  login(email: string, senha: string): boolean {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    if (userData.email === email && userData.senha === senha) {
      this.isLoggedInSubject.next(true);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('userData');
    localStorage.removeItem('empresaData');
    localStorage.removeItem('empresaCadastrada');
    this.isLoggedInSubject.next(false);
  }

  getUserData() {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }

  updateUserData(userData: any) {
    localStorage.setItem('userData', JSON.stringify(userData));
  }

  getEmpresaData() {
    const empresaData = localStorage.getItem('empresaData');
    return empresaData ? JSON.parse(empresaData) : null;
  }

  isEmpresaCadastrada(): boolean {
    return localStorage.getItem('empresaCadastrada') === 'true';
  }
} 