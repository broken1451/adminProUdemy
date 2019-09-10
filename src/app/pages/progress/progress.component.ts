import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {

  public progreso1: number;
  public progreso2: number;
  constructor() {
    this.progreso1 = 40;
    this.progreso2 = 80;
  }

  ngOnInit() {

  }

  // cambiarValor(valor: number) {
  //   if ((this.progreso >= 100)  && (valor > 0)) {
  //     this.progreso = 100;
  //     console.log(valor);
  //     console.log(this.progreso);
  //     return;
  //   }
  //   if ((this.progreso <= 0) && (valor < 0)) {
  //     this.progreso = 0;
  //     console.log(valor);
  //     console.log(this.progreso);
  //     return;
  //   }
  //   this.progreso = this.progreso + valor;
  //   console.log(valor);
  //   console.log(this.progreso);
  // }


  actualizaValor(evento: number) {
      this.progreso1 = evento;
      console.log('evento: ', evento);
  }

  actualizaValor1(evento: number) {
    this.progreso2 = evento;
    console.log('evento: ', evento);
  }
}
