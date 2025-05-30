import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visualizacao',
  templateUrl: './visualizacao.component.html',
  styleUrls: ['./visualizacao.component.scss']
})
export class VisualizacaoComponent implements OnInit {
  empresaData: any = {};

  constructor(private router: Router) {}

  ngOnInit() {
    const empresaData = localStorage.getItem('empresaData');
    if (empresaData) {
      this.empresaData = JSON.parse(empresaData);
    }
  }

  editarEmpresa() {
    this.router.navigate(['/configuracao']);
  }
} 