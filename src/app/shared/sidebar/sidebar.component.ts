import { Component, OnInit } from '@angular/core';

// Servicios
import { SidebarService, UsuarioService } from '../../services/services.index';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menu: any[];

  constructor(public sidebarService: SidebarService, private usuarioService: UsuarioService) {
    this.menu = sidebarService.menu;
  }

  ngOnInit() {
  }

  salir() {
    this.usuarioService.logout();
  }

}
