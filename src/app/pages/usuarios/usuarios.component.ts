import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/services.index';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  public usuarios: Usuario[];
  public desde: number;
  public totalRegistros: number;
  public loading: boolean;
  public noExiste: boolean;


  constructor(private usuarioService: UsuarioService,
              public modalUploadService: ModalUploadService) {
    this.usuarios = [];
    this.desde = 0;
    this.totalRegistros = 0;
    this.loading = true;
    this.noExiste = false;
  }

  ngOnInit() {
    this.cargarUsuarios();
    this.modalUploadService.notificacion.subscribe((data: any) => { // notificar que se realizaron cambios al subir la imagen
      console.log('data de notificacion: ', data);
      this.usuarioService.usuario.img = data.usuarioImgGuardada.img;
      this.usuarioService.guardarStorage(data.usuarioImgGuardada._id, this.usuarioService.token, this.usuarioService.usuario, this.usuarioService.menu);
      this.cargarUsuarios();
    });
  }

  cargarUsuarios() {
    this.loading = true;
    setTimeout(() => {
     this.usuarioService.cargarUsuarios(this.desde).subscribe( (data: any) => {
       this.usuarios = data.usuarios;
       this.totalRegistros = data.totalUsuarios;
       this.loading = false;
       console.log('data: ', data);
     });
   }, 2000);
  }

  cambiarDesde(valor: number) {
    const desde = this.desde + valor;

    if (desde >= this.totalRegistros) {
      return;
    }

    if (desde < 0) {
      return;
    }

    this.desde =  this.desde + valor;
    this.cargarUsuarios();
    console.log('valor: ', valor);
    console.log('desde: ', desde);
    console.log('this.desde: ', this.desde);

  }


  buscarUsuario(terminoInput: string) {

    if (terminoInput.length <= 0 ) {
      this.cargarUsuarios();
      return;
    }

    this.loading = true;
    setTimeout(() => {
      this.usuarioService.buscarUsuario(terminoInput).subscribe( (data: any) => {
        this.usuarios = data.Usuarios;

        if (this.usuarios.length === 0  ) {
            // this.cargarUsuarios();
            this.noExiste = true;
            return;
        }

        this.loading = false;
        this.noExiste = false;
        console.log('data: ', data);
      });
    }, 1500);
    console.log('terminoInput: ', terminoInput);
  }

  borrarUsuario(usuario: Usuario) {
    if (usuario._id  === this.usuarioService.usuario._id) {
      Swal.fire('No puede Eliminar usuario', 'No se puede eliminar el usuario logueado o a si mismo', 'error');
      return;
    }

    Swal.fire({
      title: 'Esta seguro?',
      text: 'Borrara el usurio ' + usuario.nombre,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si!'
    }).then((borrar) => {
      console.log('borrar: ', borrar);
      if (borrar.value) {
        this.usuarioService.borrarUsuario(usuario._id).subscribe( (usuarioBorrado: any) => {
          this.totalRegistros = this.totalRegistros - 1;
          if (this.desde === this.totalRegistros) {
            console.log('this.desde: ', this.desde);
            this.desde =  this.desde - 4;
            console.log('this.totalRegistros: ', this.totalRegistros);
          }
          this.cargarUsuarios();
          console.log('usuarioBorrado: ', usuarioBorrado);
          console.log('this.desde: ', this.desde);
          console.log('this.totalRegistros: ', this.totalRegistros);
        });
      } else if (borrar.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado', 'El Usuario ' + usuario.nombre + ' esta a salvo :)', 'info');
        console.log('this.totalRegistros: ', this.totalRegistros);
      }
    });

    console.log(usuario);
    console.log('this.desde: ', this.desde);
    console.log('this.totalRegistros: ', this.totalRegistros);
  }


  guardarRolUsuario(usuario: Usuario) {
    this.usuarioService.guardarRolUsuario(usuario).subscribe( (rolActualizado) => {
      console.log('rolActualizado: ', rolActualizado);
    });
  }


  mostrarModal(usuario: Usuario) {
    console.log('funciona mostrar modal');
    this.modalUploadService.mostrarModal('usuarios', usuario._id);
  }
}
