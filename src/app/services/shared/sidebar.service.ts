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
          {titulo: 'Account Settings', url: '/account-settings'},
        ]
    }];
  }





}
