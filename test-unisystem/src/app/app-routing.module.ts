import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ConfiguracaoComponent } from './configuracao/configuracao.component';
import { PerfilComponent } from './perfil/perfil.component';
import { EmpresaComponent } from './empresa/empresa.component';

export const routes: Routes = [
  { path: '', redirectTo: '/cadastro', pathMatch: 'full' },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'home', component: HomeComponent },
  { path: 'configuracao', component: ConfiguracaoComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'empresa', component: EmpresaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { } 