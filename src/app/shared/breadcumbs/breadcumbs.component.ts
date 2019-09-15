import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcumbs',
  templateUrl: './breadcumbs.component.html',
  styleUrls: ['./breadcumbs.component.scss']
})
export class BreadcumbsComponent implements OnInit {

  public titulo: string;
  public contenido: string;


  constructor(private router: Router, private title: Title,
              private metaTag: Meta) {

    this.getDataRoute().subscribe((dataEvento: any) => {

      this.titulo = dataEvento.titulo;
      this.contenido = dataEvento.descrip;
      this.title.setTitle(this.titulo);
      console.log('DataEvento: ', dataEvento);
      console.log('this.titulo: ', this.titulo);

      // Metas Tags
      const metasTag: MetaDefinition = {
          name: this.titulo,
          content: this.contenido
      };
      this.metaTag.updateTag(metasTag);
    });

  }

  ngOnInit() {
  }

  getDataRoute() {
   return this.router.events.pipe(
      filter((evento) => {
        console.log('evento 1 filter: ', evento);
        if (evento instanceof ActivationEnd) {
          return true;
        }
      }),
      filter((evento: ActivationEnd) => {
        console.log('evento 2 filter: ', evento);
        if (evento.snapshot.firstChild === null) {
          return true;
        }
      }),
      map((evento: ActivationEnd) => {
          console.log('map despues del filter: ', evento);
          return evento.snapshot.data;
      })
    );
  }

}
