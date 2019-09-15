import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  public ajustes: Ajustes;

  constructor( @Inject(DOCUMENT) private document) {
    this.ajustes = {
      temaUrl: 'assets/css/colors/default.css',
      tema: 'default'
    };

    this.cargarAjusteStorage();
  }


  guardarAjustesStorage() {
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
    console.log('Guardado en localStorage');
  }

  cargarAjusteStorage() {

    if (localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      this.aplicarTema(this.ajustes.tema);
      console.log('cargando del localStorage');
      console.log('this.ajustes.tema: ', this.ajustes.tema);
    } else {
      this.aplicarTema(this.ajustes.tema);
      console.log('Usando valores por defecto');
      console.log('this.ajustes.tema: ', this.ajustes.tema);
    }

  }

  aplicarTema(tema: string) {
    // tslint:disable-next-line:prefer-const
    let url = `assets/css/colors/${tema}.css`;

    this.document.getElementById('tema').setAttribute('href', url);
    console.log('tema: ', tema);
    // console.log('link: ', link);
    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;
    this.guardarAjustesStorage();
  }

}

export interface Ajustes {
  temaUrl: string;
  tema: string;
}
