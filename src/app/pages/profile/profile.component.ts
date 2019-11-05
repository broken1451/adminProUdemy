import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

// Usuario service
import { UsuarioService } from '../../services/services.index';

// Modelo de Usuario
import { Usuario } from '../../models/usuario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public usuario: Usuario;
  public imagenSubir: File;
  public imagenTemporal: string | ArrayBuffer;

  constructor(private usuarioService: UsuarioService) {
    this.usuario = this.usuarioService.usuario;
  }

  ngOnInit() {
  }


  guardar(usuario: Usuario) {
    this.usuario.nombre = usuario.nombre;
    if (this.usuario.google) {
      return;
    } else {
      this.usuario.email = usuario.email;
    }
    this.usuarioService.actualizarUsuario(this.usuario).subscribe( (usuarioActualizado) => {
      console.log('usuarioActualizado: ', usuarioActualizado);
    });
    console.log('usuario: ', usuario);
  }

// Con el  valor del formulario completo
//  guardar(formulario: NgForm) {
//      console.log('formulario: ', formulario);
//      console.log('formulario: ', formulario.value);
//      this.usuario.nombre = formulario.value.nombre;
//      this.usuario.email = formulario.value.correo;
//      this.usuarioService.actualizarUsuario(this.usuario).subscribe( (usuarioActualizado) => {
//        console.log('usuarioActualizado: ', usuarioActualizado);
//      });

//      console.log('this.usuario.nombre: ', this.usuario.nombre);
//      console.log('this.usuario.email: ', this.usuario.email);
//   }


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
  };

  console.log('archivo: ', archivo);
  console.log('this.imagenSubir: ', this.imagenSubir);



 }

 cambiarImagen() {

  this.usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id);
 }

}


