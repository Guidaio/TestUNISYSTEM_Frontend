import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ConfiguracaoComponent } from './configuracao/configuracao.component';
import { VisualizacaoComponent } from './visualizacao/visualizacao.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { PerfilComponent } from './perfil/perfil.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'home', component: HomeComponent },
  { path: 'configuracao', component: ConfiguracaoComponent },
  { path: 'visualizacao', component: VisualizacaoComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: '**', redirectTo: '/login' }
];
