import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/hospitales/hospital.service';
import { Hospital } from '../../models/hospital.model';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';



@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.scss']
})
export class HospitalesComponent implements OnInit {

  public hospitales: Hospital[];
  public hospital: Hospital;
  public desde: number;
  // public totalRegistros: number;
  public loading: boolean;
  public noExiste: boolean;

  constructor(public hospitalService: HospitalService,
              private usuarioService: UsuarioService,
              private modalUploadService: ModalUploadService) {
    this.desde = 0;
    this.hospitales =  [];
    this.loading = true;
    this.noExiste = false;
    // this.totalRegistros = this.hospitalService.totalRegistros;
  }

  ngOnInit() {
    this.getHospitales();
    this.modalUploadService.notificacion.subscribe((data: any) => { // notificar que se realizaron cambios al subir la imagen
        // this.hospitalService.hospital.img = data.hospitalImgGuardada.img;
        // this.usuarioService.guardarStorage(data.hospitalImgGuardada._id, this.usuarioService.token, this.usuarioService.usuario);
        console.log('data de notificacion: ', data);
        console.log('this.hospital: ', this.hospital);
        this.getHospitales();
    });
  }

  // Obtener hospitales
  getHospitales() {
    this.loading = true;
    setTimeout(() => {
      this.hospitalService.getHospitales(this.desde).subscribe( (data: any) => {
      this.hospitales = data;
      // this.totalRegistros = data.totalHospitales;
      this.loading = false;
      console.log('Hospitales: ', data);
    });
  }, 2000);
}

// Crear Hospital
 crearHospital() {

  // Swal.fire({
  //   title: 'Crear hospital',
  //   text: 'Ingrese nombre de hospital a crear',
  //   input: 'text',
  //   showCancelButton: true,
  //   confirmButtonText: 'Crear',
  //   showLoaderOnConfirm: true,
  //   type: 'info',
  //   confirmButtonColor: '#3085d6',
  //   cancelButtonColor: '#d33',

  // }).then((valor): any => {
  //   console.log('valor: ', valor);
  //   let nuevoHospital = new Hospital(valor.value);
  //   if (valor) {
  //     this.hospitalService.crearHospital(nuevoHospital).subscribe( (hospitalCreado) => {
  //       this.hospitales.push(hospitalCreado.hospitalGuardado);
  //       this.getHospitales();
  //       console.log('hospitalCreado: ', hospitalCreado);
  //     });
  //   } else if (valor.dismiss === Swal.DismissReason.cancel) {
  //     Swal.fire('Cancelado', 'El Hospital ' + valor.value + ' no se ha creado', 'info');
  //   }
  //   // if (!nuevoHospital || nuevoHospital === undefined || nuevoHospital === null || valor === ' ') {
  //   //   Swal.fire('El campo no puede estar vacio', nuevoHospital.nombre, 'error');
  //   //   this.getHospitales();
  //   //   return;
  //   // }
  // });


  Swal.fire({
    title: 'Crear hospital',
    text: 'Ingrese nombre de hospital a crear',
    input: 'text',
    showCancelButton: true,
    confirmButtonText: 'Crear',
    showLoaderOnConfirm: true,
    type: 'info',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
  }).then((valor: any) => {
    console.log('valor: ', valor);
    let nuevoHospital = new Hospital(valor.value);
    if (!nuevoHospital  || valor.length <= 0) {
     return ;
    } else {
      this.hospitalService.crearHospital(nuevoHospital).subscribe( (hospitalCreado) => {
        this.hospitales.push(hospitalCreado.hospitalGuardado);
        this.getHospitales();
        console.log('hospitalCreado: ', hospitalCreado);
      });
    }
    //  else if (valor.dismiss === Swal.DismissReason.cancel) {
    //   Swal.fire('Cancelado', 'El Usuario ' + valor.value + ' esta a salvo :)', 'info');
    // }
  });

 }



//  Buscar hospitales
  buscarHospital(inputBuscarHospital: string) {
    if (inputBuscarHospital.length <= 0 ) {
       this.getHospitales();
       return;
    }


    this.loading = true;
    setTimeout(() => {
      this.hospitalService.buscarHospital(inputBuscarHospital).subscribe((hospitalBuscado: any) => {
        this.hospitales = hospitalBuscado.Hospitales;
        if (this.hospitales.length === 0  ) {
          // this.cargarUsuarios();
          this.noExiste = true;
          this.loading = false;
          return;
        }
        this.loading = false;
        this.noExiste = false;
        console.log('hospitalBuscado: ', hospitalBuscado);
      });
    }, 1500);
  }


// Borrar hospital
 borrarHospital(hospital: Hospital) {
   this.hospitalService.borrarHospital(hospital._id).subscribe((hospitalBorrado) => {
    Swal.fire('Hospital borrado', 'Eliminado el hospital con el nombre ' + hospital.nombre, 'success');
    this.getHospitales();
    console.log('hospitalBorrado: ', hospitalBorrado);
  });
}

//  Actualizar Hospital
actualizarHospital(hospital: Hospital) {
  this.hospitalService.actualizarHospital(hospital).subscribe((hospitalActualizado: any) => {
    Swal.fire('Hospital Actualizado', 'El hospital con el nombre ' + hospital.nombre + ' ha sido actualizado', 'success');
    console.log('hospitalActualizado: ', hospitalActualizado);
  });
 }

//  Mostrar modal parza cambiar imagen hospital
mostrarModal(hospital: Hospital) {
  console.log('funciona mostrar modal');
  console.log('hospital: ', hospital);
  this.modalUploadService.mostrarModal('hospitales', hospital._id);
}

}
