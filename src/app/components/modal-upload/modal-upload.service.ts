import { Injectable, EventEmitter } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  public tipo: string;
  public id: string;
  public oculto: string;
  public hospital: Hospital;
  public notificacion = new EventEmitter<any>(); // emitir algo q los otros componentes usan este servicios se puedan subscribir y escuchar los cambios

  constructor() {
    this.oculto =  'oculto';
    console.log('Modal upload service listo');
  }

  ocultarModal() {
    this.oculto = 'oculto';
    this.tipo = null;
    this.id = null;

  }

   mostrarModal(tipo: string, id: string) {
    this.oculto = ' ';
    this.tipo = tipo;
    this.id = id;
  }

}

