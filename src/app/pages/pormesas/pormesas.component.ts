import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-pormesas',
  templateUrl: './pormesas.component.html',
  styles: []
})
export class PormesasComponent implements OnInit {

  constructor() {

    // let promesa = new Promise( (resolve, reject) => {

    //     let contador = 0;
    //     let intervalo = setInterval( () => {
    //       contador = contador + 1;
    //       console.log('contador: ', contador);
    //       if (contador === 3) {
    //         resolve('resolve(Resolvio la promesa)');
    //         // reject('No Resolvio la promesa');
    //         clearInterval(intervalo);
    //       }
    //     }, 1000);

    // });

    // // 1) Manera
    // // promesa.then(
    // //   () => console.log('Resolvio la promesa'),
    // //   () => console.error('No Resolvio la promesa')
    // // );

    // // 2) Manera
    // promesa.then(
    //   (mensaje) => {
    //     console.log('Resolvio la promesa: ', mensaje);
    //   }
    // ).catch( (error) => {
    //   console.error('No Resolvio la promesa: ', error);
    // });

    /*--------------------------------------------------------------------*/
    // // 1) Manera
    // // promesa.then(
    // //   () => console.log('Resolvio la promesa'),
    // //   () => console.error('No Resolvio la promesa')
    // // );

    // 2) Manera
    this.contar3().then(
      (mensaje) => {
        console.log('Resolvio la promesa: ', mensaje);
      }
    ).catch( (error) => {
      console.error('No Resolvio la promesa: ', error);
    });


  }

  ngOnInit() {
  }

  contar3(): Promise<boolean> {
    return  new Promise( (resolve, reject) => {

      let contador = 0;
      let intervalo = setInterval( () => {
        contador = contador + 1;
        console.log('contador: ', contador);
        if (contador === 3) {
          // resolve('resolve(Resolvio la promesa)');
          resolve(true);
          // reject('No Resolvio la promesa');
          clearInterval(intervalo);
        }
      }, 1000);

    });

    // return promesa;
  }

}
