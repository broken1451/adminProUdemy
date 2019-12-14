import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Swal from 'sweetalert2';
import { SubirArchivoService } from '../../services/subirArchivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/hospitales/hospital.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styleUrls: ['./modal-upload.component.scss']
})
export class ModalUploadComponent implements OnInit {

  public oculto: string;
  public tipo: string;
  public id: string;
  public hospital: Hospital;
  public imagenSubir: File;
  public imagenTemporal: string | ArrayBuffer;
  @ViewChild('inputSubirImagen', {static: false}) inputSubirImagen: ElementRef;

  constructor(public subirArchivoService: SubirArchivoService,
              public modalUploadService: ModalUploadService, public hospitalService: HospitalService) {
    // this.oculto = this.modalUploadService.oculto;
    this.tipo =  this.modalUploadService.tipo;
    this.id =  this.modalUploadService.id;
    this.hospital = this.hospitalService.hospital;
    console.log('modal component listo');
    console.log('this.imagenSubir: ', this.inputSubirImagen);
  }

  ngOnInit() {

  }

  seleccionImagen(archivo: File) {
    // console.log('evento: ', evento.target.files[0]);
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    if (archivo.type.indexOf('image') < 0) {
      Swal.fire('Solo Imagenes', 'El archivo selecciionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    // Cargar imagen temporal
    let reader = new FileReader();
    let urlImagenTemporal = reader.readAsDataURL(archivo); // imagen temporal
    reader.onload = () => {
      // console.log('urlImagenTemporal: ', urlImagenTemporal);
      this.imagenTemporal =  reader.result;
      // console.log('this.imagenTemporal: ', this.imagenTemporal);
      console.log('reader.result: ', reader.result);
      console.log('reader.result: ', reader);
    };

    console.log('archivo: ', archivo);
  }

  ocultarModal() {
    this.imagenSubir = null;
    this.imagenTemporal =  null;
    this.inputSubirImagen = null;
    this.modalUploadService.ocultarModal();
  }

  subirImagen() {

    this.subirArchivoService.subirArchivo(this.imagenSubir, this.modalUploadService.tipo, this.modalUploadService.id).then( (data: any) => {
      this.modalUploadService.notificacion.emit(data); // emitir la informacion necesaria de la respuesta del servicio
      this.ocultarModal();
    }).catch((err) => {
      console.log(err);
    });
  }
}
