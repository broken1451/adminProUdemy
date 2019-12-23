import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu: any[];

  constructor(private usuarioService: UsuarioService) {
    // this.menu = [{
    //   titulo: 'Principal',
    //   icono: 'mdi mdi-gauge',
    //     submenu: [
    //       {titulo: 'Dashboard', url: '/dashboard'},
    //       {titulo: 'Progress', url: '/progress'},
    //       {titulo: 'Graficas', url: '/graficas1'},
    //       {titulo: 'Promesas', url: '/promesas'},
    //       {titulo: 'Rxjs', url: '/rxjs'},
    //       {titulo: 'Account Settings', url: '/account-settings'},
    //     ]
    // },
    // {
    //   titulo: 'Mantenimientos',
    //   icono: 'mdi mdi-folder',
    //   submenu: [
    //     {titulo: 'Usuario', url: '/usuarios'},
    //     {titulo: 'Hospitales', url: '/hospitales'},
    //     {titulo: 'Medicos', url: '/medicos'},
    //   ]
    // }];
    // this.menu = [];
    // this.cargarMenu();
  }

  cargarMenu() {
    this.menu =  this.usuarioService.menu;
  }





}
