import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/medico/medico.service';
import { Medico } from '../../models/medico.model';


@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.scss']
})
export class MedicosComponent implements OnInit {

  public medicos: Medico[];
  public desde: number;
  // public totalRegistros: number;
  public loading: boolean;
  public noExiste: boolean;

  constructor(public medicoService: MedicoService) { }

  ngOnInit() {
    this.getMedicos();
  }

  // Metodo para obtener todos los medicos de la bd
  getMedicos() {
    this.loading = true;
    setTimeout(() => {
      this.medicoService.getMedicos().subscribe((data: any) => {
        this.medicos = data.medicos;
        this.loading = false;
        console.log('data: ', data);
        console.log('this.medicos: ', this.medicos);
      });
    }, 1500);
  }

  crearMedico() {
  }

  editarMedico(medico: Medico) {}

  // Metodo para borrar un medico
  borraMedico( medico: Medico, index?: number) {
    this.medicoService.borrarMedico(medico._id).subscribe((medicoBorrado: any) => {
      // this.medicos.splice(index);
      this.getMedicos();
      console.log('medicoBorrado: ', medicoBorrado);
    });
  }

  // Metodo para buscar un medico en la bd
  buscarMedico(terminoInputMedico: string) {
    if (terminoInputMedico.length <= 0 ) {
      this.getMedicos();
      return;
   }
    this.loading = true;
    setTimeout(() => {
     this.medicoService.buscarMedico(terminoInputMedico).subscribe((medicoBuscado: any) => {
       this.medicos = medicoBuscado.Medicos;
       if (this.medicos.length === 0  ) {
         // this.cargarUsuarios();
         this.noExiste = true;
         this.loading = false;
         return;
       }
       this.loading = false;
       this.noExiste = false;
       console.log('medicoBuscado: ', medicoBuscado);
     });
   }, 1500);
  }

}
