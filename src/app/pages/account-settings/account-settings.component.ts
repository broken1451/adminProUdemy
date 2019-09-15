import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SettingsService } from '../../services/services.index';


@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {

  // constructor(@Inject(DOCUMENT) private document,
  //             public settingsService: SettingsService) {}

  constructor(public settingsService: SettingsService) {}

  ngOnInit() {
    // document.getElementById().setAttribute('href')
    // document.getAttribute('nombre del atributo/personalizado o propio')
    this.colocarCheck();
  }

  cambiarColor(tema: string, link: any ) {

    this.settingsService.aplicarTema(tema);
    this.aplicarCheck(link);

    // let url = `assets/css/colors/${tema}.css`;
    // this.document.getElementById('tema').setAttribute('href', url);
    // // console.log('tema: ', tema);
    // // console.log('link: ', link);
    // this.settingsService.ajustes.tema = tema;
    // this.settingsService.ajustes.temaUrl = url;
    // this.settingsService.guardarAjustesStorage();
  }

  aplicarCheck(link: any) {
    // tslint:disable-next-line: prefer-const
    let selectores: any = document.getElementsByClassName('selector');
    for (const selector of selectores) {
      selector.classList.remove('working');
    }
    link.classList.add('working');
  }

  colocarCheck() {
    let selectores: any = document.getElementsByClassName('selector');
    let tema = this.settingsService.ajustes.tema;

    for (const selector of selectores) {
      if ( ( selector.getAttribute('data-theme') === tema )  ) {
        selector.classList.add('working');
        break;
      }
    }
  }




}
