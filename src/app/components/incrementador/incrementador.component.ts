import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  // @Input() leyenda: string;
  // @Input() progreso: number;
  @Input('nombreLeyenda') leyenda: string;
  @Input() progreso: number;
  // @Output('actualiza') cambioValor: EventEmitter<number>;
  @Output() cambioValor: EventEmitter<number>;

  @ViewChild('progress', {static: false}) txtprogress: ElementRef;

  constructor() {
    this.progreso = 40;
    this.leyenda = 'Leyenda :v';
    this.cambioValor = new EventEmitter();
    // console.log('Leyenda:', this.leyenda);
    // console.log('Progreso:', this.progreso);
  }

  ngOnInit() {
    // console.log('Leyenda:', this.leyenda);
    // console.log('Progreso:', this.progreso);
  }

  cambiarValor(valor: number) {
    if ((this.progreso >= 100)  && (valor > 0)) {
      this.progreso = 100;
      console.log(valor);
      console.log(this.progreso);
      return;
    }
    if ((this.progreso <= 0) && (valor < 0)) {
      this.progreso = 0;
      console.log(valor);
      console.log(this.progreso);
      return;
    }
    this.progreso = this.progreso + valor;
    this.cambioValor.emit(this.progreso);
    this.txtprogress.nativeElement.focus();
    console.log(valor);
    console.log(this.progreso);
  }

  cambioNgModel(eventNewValue: number) {

    // console.log('event: ', event); //toda funcion recibe un evento aunque no este explixita en chrome
    // let elementHtml: any = document.getElementsByName('progreso')[0];
    // console.log('elementHtml: ', elementHtml.value);


    if (eventNewValue >= 100) {
      this.progreso = 100;
    } else if (eventNewValue <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = eventNewValue;
    }

    // elementHtml.value = Number(this.progreso);
    // elementHtml.value = this.progreso;

    // Con viewchild
    this.txtprogress.nativeElement.value = this.progreso;
    console.log('this.txtprogress ', this.txtprogress);
    // this.cambioValor.emit(this.progreso);
    this.cambiarValor(this.progreso);
    console.log('eventNewValue: ', eventNewValue);
  }

}
