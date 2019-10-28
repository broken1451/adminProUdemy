import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/services.index';
import { Usuario } from '../models/usuario.model';

// Importar codigo fuera de angular plugings/funciones/jquery/etc
declare function initPlugings();
declare const gapi: any; // Google API

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public email: string;
  public password: string;
  public recuerdame: boolean;
  public auth2: any; // variable de google

  constructor(public router: Router,
              private usuarioService: UsuarioService ) {

    this.email = '';
    this.password = '';
    this.recuerdame = false;
  }

  ngOnInit() {
    initPlugings();
    // this.email =  localStorage.getItem('email') || '' ; // si viene undefined toma las comillas
    // if (this.email.length > 1) {
    //   this.recuerdame = true;
    // }
    this.googleInit();

    if (localStorage.getItem('email')) {
      this.email = localStorage.getItem('email');
      this.recuerdame = true;
    } else {
      this.email = '';
      this.recuerdame = false;
    }
  }

/*
// ng g c components/nombrecomponente --module=app.module --spec=false
*/

// Google
 googleInit() {
  // toda la inicializacion del plugin de google api
  // gapi.load('auth2', funcion del callback cuando ya se carge el objeto de auth2)
  gapi.load('auth2', () => {
    this.auth2 = gapi.auth2.init({
      client_id: '1015734633177-sca3hqa7hu8887ll76okomj5g0b7e0ov.apps.googleusercontent.com',
      cookie_policy: 'single_host_origin', // solo de aqui se va a salir
      scope: 'profile email' // informacion que se neesita de google del usuario q se esta logeando
    });
    this.attachSignin(document.getElementById('btnGoogle'));
    console.log('this.auth2: ', this.auth2);
  });
 }

 attachSignin(elementHTML) {
  //  this.auth2.attachClickHandler(elemento html, {}, callback que cuando lo haga recibe un objeto o googleuser);
  this.auth2.attachClickHandler(elementHTML, {}, (googleUser) => {
    let profile = googleUser.getBasicProfile();
    let token = googleUser.getAuthResponse().id_token;
    console.log('googleUser: ', googleUser);
    console.log('profile: ', profile);
    console.log('token: ', token);
    this.usuarioService.loginGoogle(token).subscribe( (dataGoogle: any) => {
      // this.router.navigate(['/dashboard']);
      window.location.href = '#/dashboard';
      console.log('data ', dataGoogle);
    });
  });
  console.log('this.auth2: ', this.auth2);
 }
////////////////////////////////////////////////////////////////////////

  ingresar(formulario: NgForm) {
    // this.router.navigate(['/dashboard']);
    // console.log('Ingresando...');
    if (formulario.invalid) {
      return;
    }

    let usuario = new Usuario(null, formulario.value.email, formulario.value.password);

    this.usuarioService.login(usuario, formulario.value.recuerdame).subscribe( (usuarioLogin: Usuario) => {
      this.router.navigate(['/dashboard']);
      console.log('usuarioLogin: ', usuarioLogin);
      // console.log('formulario.value.recuerdame: ', formulario.value.recuerdame);
    });

    console.log('Formulario valido: ', formulario.valid);
    console.log('Formulario valor: ', formulario.value);
  }
}
