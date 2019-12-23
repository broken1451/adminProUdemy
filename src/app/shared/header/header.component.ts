import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/services.index';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public usuario: Usuario;

  constructor(private usuarioService: UsuarioService,
              private router: Router) {
  }

  ngOnInit() {
    this.usuario = this.usuarioService.usuario;
  }


  busquedaGeneral(termino: string) {
    this.router.navigate(['/busqueda', termino]);
    console.log('Termino: ', termino);
  }

  salir() {
    this.usuarioService.logout();
  }
}
