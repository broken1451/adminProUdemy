import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu: any[];

  constructor() {
    this.menu = [{
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
        submenu: [
          {titulo: 'Dashboard', url: '/dashboard'},
          {titulo: 'Progress', url: '/progress'},
          {titulo: 'Graficas', url: '/graficas1'},
          {titulo: 'Promesas', url: '/promesas'},
          {titulo: 'Rxjs', url: '/rxjs'},
          {titulo: 'Account Settings', url: '/account-settings'},
        ]
    },
    {
      titulo: 'Mantenimientos',
      icono: 'mdi mdi-gauge-lock-open',
      submenu: [
        {titulo: 'Usuario', url: '/usuarios'},
        {titulo: 'Hospitales', url: '/hospitaless'},
        {titulo: 'Medicos', url: '/medicos'},
      ]
    }];
  }





}
