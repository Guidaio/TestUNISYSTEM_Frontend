import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faUser, faCog, faSignOutAlt, faHome, faBuilding, faUsers, faChartBar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isAuthenticated = false;
  isEmpresaCadastrada = false;
  isSidebarOpen = true;
  faBars = faBars;
  faUser = faUser;
  faCog = faCog;
  faSignOutAlt = faSignOutAlt;
  faHome = faHome;
  faBuilding = faBuilding;
  faUsers = faUsers;
  faChartBar = faChartBar;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });

    this.authService.isEmpresaCadastrada().subscribe(isEmpresaCadastrada => {
      this.isEmpresaCadastrada = isEmpresaCadastrada;
    });
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  logout(): void {
    this.authService.logout();
  }

  canNavigate(route: string): boolean {
    if (route === '/configuracao') {
      return true;
    }
    return this.isEmpresaCadastrada;
  }
}
