import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URLSERVICIO } from '../../config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario: Usuario;
  public token: string;


  constructor(public httpClient: HttpClient,
              private router: Router) {
    console.log('servicio de usuario listo');
    this.cargarStorage();
  }

  guardarStorage(id: string, token: string, usuario: Usuario ) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuario = usuario;
    this.token = token;
  }

  cargarStorage() {
    if (localStorage.getItem('token') || localStorage.getItem('usuario')) {
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.token = localStorage.getItem('token');
    } else {
      this.usuario = null;
      this.token = '';
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
    let url = URLSERVICIO + '/login/google';
    return this.httpClient.post(url, {token:token}).pipe(map((resLoginGoole: any) => {
      console.log('resLoginGoole del map: ', resLoginGoole);
      this.guardarStorage(resLoginGoole.id, resLoginGoole.token, resLoginGoole.usuarioBdLogin);
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

    let url = URLSERVICIO + '/login';
    return this.httpClient.post(url, usuario).pipe(map( (resLogin: any) => {
      console.log('resLogin del map: ', resLogin);
      // localStorage.setItem('id', resLogin.id);
      // localStorage.setItem('token', resLogin.token);
      // localStorage.setItem('usuario', JSON.stringify(resLogin.usuarioBdLogin));
      this.guardarStorage(resLogin.id, resLogin.token, resLogin.usuarioBdLogin);
      return resLogin;
    }));

  }

// Metodo de crear un usuario
  crearusuario(usuario: Usuario) {

    let url = URLSERVICIO + '/usuario';

    return this.httpClient.post(url, usuario)
                .pipe(map( (data: any) => {
                  console.log('data: ', data);
                  Swal.fire('Usuario Creado', data.usuarioGuardado.email, 'success');
                  return data.usuarioGuardado;
                }));
  }

// Metodo de logout
  logout() {
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

}
