import { Component, OnInit } from '@angular/core';
import { SettingsService, SidebarService, SharedService, UsuarioService } from '../services/services.index';

// Importar codigo fuera de angular plugings/funciones/jquery/etc, llamar script fuera de angular
declare function initPlugings();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor(public settingsService: SettingsService, private usuarioService: UsuarioService) { 

  }

  ngOnInit() {
    initPlugings();
  }

}
