import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URLSERVICIO } from '../../config/config';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario: Usuario;
  public token: string;
  public menu: any[] = [];


  constructor(public httpClient: HttpClient,
              private router: Router,
              private subirArchivoService: SubirArchivoService) {
    console.log('servicio de usuario listo');
    this.cargarStorage();
  }

  // Metodo de renovar token
  renovartoken() {
    let url =  URLSERVICIO + `/login/renuevatoken/${this.token}`;
    return this.httpClient.get(url).pipe( map((resNewToken: any) => {
      console.log('TOKEN RENOVADO');
      console.log('resNewToken: ', resNewToken);
      this.token =  resNewToken.token;
      localStorage.setItem('token', this.token);
      return resNewToken.token;
    }), catchError((err: any) => {
         console.log('err: ', err);
         this.router.navigate(['/login']);
         Swal.fire('Error', 'No se pudo renovar token', 'error');
         return throwError(err);
    }));
  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any ) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));
    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  cargarStorage() {
    if (localStorage.getItem('token') || localStorage.getItem('usuario')) {
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.token = localStorage.getItem('token');
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.usuario = null;
      this.token = '';
      this.menu = [];
    }
  }

  // Metodo para saber si esta logueado el usuario y se usa con el guard
  estaLogueado() {
      // return (this.token.length > 1) ? true : false;

      if (localStorage.getItem('token') || localStorage.getItem('usuario')) {
        console.log('Paso por el login guard de la funcion estaLogueado');
        return true;
      } else {
        console.log('Debe estar logueado');
        return false;
      }
  }


// Metodo de log8in google
  loginGoogle(token: string) {
    const url = URLSERVICIO + '/login/google';
    return this.httpClient.post(url, {token}).pipe(map((resLoginGoole: any) => {
      console.log('resLoginGoole del map: ', resLoginGoole);
      this.guardarStorage(resLoginGoole.id, resLoginGoole.token, resLoginGoole.usuarioBdLogin, resLoginGoole.menu);
      return resLoginGoole ;
    }));
  }

 // Metodo de login normal de usuario
  login(usuario: Usuario, recordar?: boolean) {

    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    const url = URLSERVICIO + '/login';
    return this.httpClient.post(url, usuario).pipe(map( (resLogin: any) => {
      console.log('resLogin del map: ', resLogin);
      // localStorage.setItem('id', resLogin.id);
      // localStorage.setItem('token', resLogin.token);
      // localStorage.setItem('usuario', JSON.stringify(resLogin.usuarioBdLogin));
      this.guardarStorage(resLogin.id, resLogin.token, resLogin.usuarioBdLogin, resLogin.menu);
      return resLogin;
    }), catchError((err: any) => {
      console.log('err: ', err);
      Swal.fire('Error', err.error.mensaje, 'error');
      return throwError(err);
    }));

  }

// Metodo de crear un usuario
  crearusuario(usuario: Usuario) {

    const url = URLSERVICIO + '/usuario';

    return this.httpClient.post(url, usuario)
                .pipe(map( (data: any) => {
                  console.log('data: ', data);
                  Swal.fire('Usuario Creado', data.usuarioGuardado.email, 'success');
                  return data.usuarioGuardado;
                }), catchError((err: any) => {
                  console.log('err: ', err);
                  Swal.fire(err.error.mensaje, err.error.errors.errors.email.message, 'error');
                  return throwError(err);
                }));
  }

  // Metodo de actualizar usuario
  // actualizarUsuario(id: string) {
  actualizarUsuario(usuario: Usuario) {

    const url = URLSERVICIO + '/usuario/' + usuario._id + '?token=' + this.token; // llamada al servicio
    console.log('url: ', url);
    console.log('token: ', this.token);

    return this.httpClient.put(url, this.usuario).pipe( map((data: any) => {
      console.log('data del map: ', data);
      const usuarioBD: Usuario =  data.usuarioId;
      // this.usuario = data.usuarioId;
      this.guardarStorage(usuarioBD._id, this.token, usuarioBD, this.menu);
      Swal.fire('Usuario Actualizado', usuario.nombre, 'success');
      return data.usuarioId;
    }), catchError((err: any) => {
      console.log('err: ', err);
      Swal.fire(err.error.mensaje, err.error.errors.errors.nombre.message, 'error');
      return throwError(err);
    }));
  }

  // Metodo de actualizar rol de usuario
  guardarRolUsuario(usuario: Usuario) {

    const url = URLSERVICIO + '/usuario/' + usuario._id + '?token=' + this.token; // llamada al servicio
    console.log('url: ', url);
    console.log('token: ', this.token);

    return this.httpClient.put(url, usuario).pipe( map((data: any) => {
      console.log('data del map: ', data);
      // if (usuario respuesta === usuario logeado actualmente) {
      if (usuario._id === this.usuario._id) {
        const usuarioBD: Usuario =  data.usuarioId;
        this.guardarStorage(usuarioBD._id, this.token, usuarioBD, this.menu);
      } else {
        // console.log('usuario._id: ', usuario._id);
        // console.log('this.usuario._id: ', this.usuario._id);
        // Swal.fire('ROL no actualizado', 'Solo puede cambiar de rol el usuario logueado ', 'info');
        // return;
      }
      console.log('usuario._id: ', usuario._id);
      console.log('this.usuario._id: ', this.usuario._id);
      Swal.fire('Usuario Actualizado', usuario.nombre, 'success');
      return data.usuarioId;
    }));
  }

  // Metodo de borrar un usuario
  borrarUsuario(id: string) {

    const url = URLSERVICIO + `/usuario/${id}?token=${this.token}`;
    return this.httpClient.delete(url).pipe( map( (data: any) => {
      Swal.fire('Usuario Borrado', 'El usuario con el nombre ' + data.usuarioBorradoId.nombre + ' ha sido borrado correctamente', 'success');
      console.log(data);
      return data;
    }));
  }



 // Metodo de cambiar imagen
 cambiarImagen(archivo: File, id: string) {
    console.log(id);
    this.subirArchivoService.subirArchivo(archivo, 'usuarios', id)
                            .then( ((data: any) => {
                              this.usuario.img = data.usuarioImgGuardada.img;
                              Swal.fire('Imagen actualizada exitosamente', this.usuario.nombre, 'success');
                              this.guardarStorage(id, this.token, this.usuario, this.menu);
                              console.log(data);
                              })).catch(((err) => {
                                console.log(err);
                            }));
 }


// Metodo para obtener todos los usuarios de la bd
  cargarUsuarios(desde?: number) {
    const url = URLSERVICIO + `/usuario?desde=${desde}`;
    return this.httpClient.get(url).pipe( map((dataUsuarios: any) => {
        console.log('dataUsuarios del get: ', dataUsuarios);
        const usuarioBD = dataUsuarios.usuarios;
        return dataUsuarios;
    }));
  }

// Metodo de buscar un usuario
  buscarUsuario(terminoDeBusqueda: any) {

    const url = URLSERVICIO + `/busqueda/coleccion/usuario/${terminoDeBusqueda}`;
    return this.httpClient.get(url);
  }

// Metodo de logout
  logout() {
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
    this.router.navigate(['/login']);
  }

}









































































































































































































































/*

  borrarUsuario(id: string) {
    let url = URLSERVICIO + `/usuario/${id}?token=${this.token}`;
    return this.httpClient.delete(url).pipe( map((res: any) => {
      Swal.fire('Usuario Borrado', 'El usuario con el nombre ' + res.usuarioBorradoId.nombre + ' ha sido borrado correctamente', 'success');
      return res;
    }));
  }


*/
