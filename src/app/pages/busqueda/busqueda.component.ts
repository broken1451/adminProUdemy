import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URLSERVICIO } from '../../config/config';
import { Usuario } from '../../models/usuario.model';
import { Hospital } from '../../models/hospital.model';
import { Medico } from '../../models/medico.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss']
})
export class BusquedaComponent implements OnInit {

  public usuarios: Usuario[];
  public medicos: Medico[];
  public hospitales: Hospital[];

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private httpClient: HttpClient) {}



  ngOnInit() {
    this.activatedRoute.params.subscribe((parametrosURL: any) => {
      let termino = parametrosURL['termino'];
      this.buscarTodo(termino).subscribe((data: any) => {
        this.usuarios = data.Usuarios;
        this.medicos = data.Medicos;
        this.hospitales = data.Hospitales;
        console.log('data: ', data);
      });
      console.log('parametrosURL: ', parametrosURL);
      console.log('termino: ', termino);
    });
  }

  buscarTodo(termino: string) {
    // let url = URLSERVICIO + `/busqueda/todo/adri?desde=colocar desde`;
    let url = URLSERVICIO + `/busqueda/todo/${termino}`;
    return this.httpClient.get(url);
  }

}
