import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/hospitales/hospital.service';
import { MedicoService } from '../../services/medico/medico.service';
import { Medico } from '../../models/medico.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SubirArchivoService, ModalUploadService } from 'src/app/services/services.index';






@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.scss']
})
export class MedicoComponent implements OnInit {

  public hospitales: Hospital[];
  public medico: Medico;
  public hospital: Hospital;


  constructor(public hospitalService: HospitalService,
              public medicoService: MedicoService,
              public usuarioService: UsuarioService,
              public router: Router,
              public activateRoute: ActivatedRoute,
              public modalUploadService: ModalUploadService) {


    this.medico = new Medico('', '', this.usuarioService.usuario._id, '');
    this.hospital =  new Hospital('');

    this.activateRoute.params.subscribe((parametrosURL: any) => {
      console.log('parametrosURL: ', parametrosURL);
      let id = parametrosURL['id'];
      // if (id !== 'nuevo') {
      //   this.cargarMedico(id);
      // }
      if (id === 'nuevo') {
        return;
      } else {
        this.cargarMedico(id);
      }

    });

  }

  ngOnInit() {
    this.hospitalService.getHospitales().subscribe( (hospitales: any) => {
      this.hospitales = hospitales;
      console.log('Hospitales: ', hospitales);
    });
    // this.medicoService.getMedicos().subscribe( (data: any) => {
    //   this.medicos = data.medicos.usuario;
    //   console.log('Medicos: ', data.medicos);
    //   console.log('this.medicos: ', this.medicos);
    // });
    this.modalUploadService.notificacion.subscribe((data: any) => {
      this.medico.img = data.medicoImgGuardada.img;
      console.log('data: ', data);
    });
  }

  // Crear Medico
  guardarMedico(formulario: NgForm) {

    if (formulario.invalid) {
      return;
    }

    this.medicoService.crearMedico(this.medico).subscribe((medico: Medico) => {
      formulario.reset();
      // this.usuario = this.usuarioService.usuario._id;
      this.medico._id = medico._id;
      this.router.navigate(['/medico', medico._id]);
      console.log('medico: ', medico);
      // console.log('this.usuario: ', this.usuario);
    });

    console.log('formulario.valid: ', formulario.valid);
    console.log('formulario.value: ', formulario.value);
  }

  // Obtener un medico
  cargarMedico(id: string) {
    this.medicoService.cargarMedico(id).subscribe((medico: any) => {
      this.medico = medico;
      this.medico.hospital = medico.hospital._id;
      // this.medico.usuario = medico.usuario._id;
      this.cambioSelectHospital(this.medico.hospital);
      console.log('medico: ', medico);
    });
  }

  // cambioSelectHospital(evento: Event) {
  //   console.log(evento.target.value);
  // }

  // Cargar hospitales del select
  cambioSelectHospital(id: string) {
    console.log('id: ' , id);
    this.hospitalService.obtenerHospital(id).subscribe((data: any) => {
      this.hospital = data.hospital;
      console.log('data: ' , data);
      console.log('id: ' , id);
    });
  }

  // Mostrar Modal para cambiar foto del medico
  mostrarModal() {
    this.modalUploadService.mostrarModal('medicos', this.medico._id);
  }

}
