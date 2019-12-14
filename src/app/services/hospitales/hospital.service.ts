import { Injectable } from '@angular/core';

// metodo para consumir servicios por peticiones http
import { HttpClient } from '@angular/common/http';

// modelo de hospital
import { Hospital } from '../../models/hospital.model';
import { Usuario } from '../../models/usuario.model';

import { URLSERVICIO } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';

import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  public hospital: Hospital;
  public totalRegistros: number;


  constructor(private httClient: HttpClient, private usuarioService: UsuarioService) {
    // console.log('Funciona el servicio de hospitales');
    this.totalRegistros = 0;
  }

  // Metodo de obtener todos los hospitales
  getHospitales(desde?: number) {
    let url = URLSERVICIO + `/hospital?desde=${desde}`;
    return this.httClient.get(url).pipe( map((data: any) => {
      console.log('data', data);
      this.totalRegistros = data.totalHospitales;
      let hospitalesDB  =  data.hospitales;
      return hospitalesDB;
    }));
  }

  // // Metodo para obtener un hospital
  obtenerHospital(	id:	string ) {
    let url = URLSERVICIO + `/hospital/${id}`;
    return this.httClient.get(url);
  }


  // Metodo de crear hospital
  // crearHospital(nombre:	any) {
    // localhost:3000/hospital?token=
  //   return this.httClient.post(url, nombre).pipe( map( (hospitalCreado: any) => {
  //     console.log('hospitalCreado: ', hospitalCreado);
  //     return hospitalCreado;
  //   }));
  // }
  crearHospital(hospital:	Hospital) {
    // let url = URLSERVICIO + `/hospital`;
    let url = URLSERVICIO + `/hospital?token=${this.usuarioService.token}`;
    return this.httClient.post(url, hospital).pipe( map( (hospitalCreado: any) => {
      console.log('hospitalCreado: ', hospitalCreado);
      return hospitalCreado;
    }));
    // return this.httClient.post(url, {nombre}).pipe( map( (hospitalCreado: any) => {
    //   console.log('hospitalCreado: ', hospitalCreado);
    //   return hospitalCreado;
    // }));
  }

  // Metodo borrar un hospital
  borrarHospital(	id:	string	) {
    // localhost:3000/hospital/5d977eeb321a8d11883d1863?token=
    let url = URLSERVICIO + `/hospital/${id}?token=${this.usuarioService.token}`;
    return this.httClient.delete(url).pipe( map((hospitalBorrado: any) => {
       console.log('hospitalBorrado: ', hospitalBorrado);
       return hospitalBorrado;
      }));
    }

    // metodo para buscar hospital en todas las colecciones
    buscarHospital(	termino:	string) {
      // localhost:3000/busqueda/todo/a?desde=0
      // localhost:3000/busqueda/coleccion/medico/g
      const url = URLSERVICIO + `/busqueda/coleccion/hospital/${termino}`;
      return this.httClient.get(url);
    }

    // metodo de actualizar hospital
    actualizarHospital(hospital: Hospital) {
      // localhost:3000/hospital/5d976680d447dd1a507d9978?token=
      let url = URLSERVICIO + `/hospital/${hospital._id}?token=${this.usuarioService.token}`;
      return this.httClient.put(url, hospital).pipe(map((hospitalActualizado) => {
        Swal.fire('Hospital Actualizado', hospital.nombre, 'success');
        console.log('hospitalActualizado: ', hospitalActualizado);
        return hospitalActualizado;
    }));
  }

}
