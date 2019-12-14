import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URLSERVICIO } from '../../config/config';
import { Medico } from '../../models/medico.model';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2';





@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  public medico: Medico;
  public medicos: Medico;
  public totalRegistros: number;

  constructor(public httpClient: HttpClient,
              public usuarioService: UsuarioService) {
    this.totalRegistros =  0;
  }

  // Metodo para obtener todos los medicos de la bd
  getMedicos(desde?: number) {
    let url = URLSERVICIO + `/medico?desde=${desde}`;
    return this.httpClient.get(url).pipe(map( (medicos: any) => {
      this.totalRegistros = medicos.totalMedicos;
      return medicos;
    }));
  }

  // Metodo de cargar un medico
  cargarMedico(id: string) {
    let url = URLSERVICIO + `/medico/${id}`;
    return this.httpClient.get(url).pipe( map((data: any) => {
      console.log('medicoID: ', data);
      return data.medico;
    }));
  }

  // Metodo para borrar un medico
  borrarMedico(id: string) {
    let url =  URLSERVICIO + `/medico/${id}?token=${this.usuarioService.token}`;
    return this.httpClient.delete(url).pipe( map((data: any) => {
        console.log('medicoBorrado: ', data);
        Swal.fire('El medico con el nombre ' + data.medicoBorrado.nombre, ' ha sido borrado exitosamente', 'success');
        return data;
    }));
  }

  // Metodo para buscar un medico en la bd
  buscarMedico(	termino:	string) {
    // localhost:3000/busqueda/todo/a?desde=0
    // localhost:3000/busqueda/coleccion/medico/g
    const url = URLSERVICIO + `/busqueda/coleccion/medicos/${termino}`;
    return this.httpClient.get(url);
  }

  // Metodo de crear un medico
  crearMedico(medico: Medico) {
    // /medico?token=
    // Hacer el servicio por separado con su boton en la vista
    if (medico._id) {
      // actualizando
      let url = URLSERVICIO + `/medico/${medico._id}?token=${this.usuarioService.token}`;
      return this.httpClient.put(url, medico).pipe(map((data: any) => {
          console.log('data: ', data);
          Swal.fire('El medico con el nombre ' + data.medicoGuardadoId.nombre, ' ha sido actualizado exitosamente', 'success');
          return data.medicoGuardadoId;
      }));
    } else {
      // creando
      let url = URLSERVICIO + `/medico?token=${this.usuarioService.token}`;
      return this.httpClient.post(url, medico).pipe( map((data: any) => {
            console.log('data: ', data);
            Swal.fire('El medico con el nombre ' + data.medicoGuardado.nombre, ' ha sido creado exitosamente', 'success');
            return data.medicoGuardado;
      }));
    }
  }

}
