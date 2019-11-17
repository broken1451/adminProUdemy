import { Component, OnInit } from '@angular/core';

// Servicios
import { SidebarService, UsuarioService } from '../../services/services.index';

// Modelo
import { Usuario } from '../../models/usuario.model';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menu: any[];
  public usuario: Usuario;



  constructor(public sidebarService: SidebarService, private usuarioService: UsuarioService) {
    this.menu = sidebarService.menu;
    console.log('menu: ', this.menu);
  }

  ngOnInit() {
    this.usuario = this.usuarioService.usuario;
  }

  salir() {
    this.usuarioService.logout();
  }

}
