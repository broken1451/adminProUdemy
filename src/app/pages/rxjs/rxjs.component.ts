import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';



@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  public subcripcion: Subscription;

  constructor() {

    // let  observa =  new Observable( (observer) => {
    //     let contador = 0;
    //     let intervalo = setInterval(() => {
    //       contador = contador + 1;
    //       observer.next(contador); // va estar notificando, emitir un valor

    //       if (contador === 2) {
    //         // clearInterval(intervalo);
    //         observer.error('ERROR');
    //       }

    //       if (contador === 3) {
    //         clearInterval(intervalo);
    //         observer.complete(); // terminar el observable
    //       }
    //     }, 1000);
    // });

    // // 3 Callbacks 1(next), 2(eror) y 3(cuando termina)
    // // observa.subscribe( (numero) => {
    // //     console.log('Subscripcion: ', numero);
    // // },
    // // (error) => {
    // //   console.log('Error de Subscripcion: ', error);
    // // },
    // // () => {
    // //   console.log('Subscripcion termino');
    // // });

    // Con retry
    // this.regresaObservable().pipe(
    //   // retry()
    //   retry(2)
    // ).subscribe( (numero) => {
    //   console.log('Subscripcion: ', numero);
    // },
    // (error) => {
    //   console.log('Error de Subscripcion: ', error);
    // },
    // () => {
    //   console.log('Subscripcion termino');
    // });


    // Con map
    this.subcripcion = this.regresaObservable().subscribe( (numero) => {
      console.log('Subscripcion: ', numero);
    },
    (error) => {
      console.log('Error de Subscripcion: ', error);
    },
    () => {
      console.log('Subscripcion termino');
    });

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subcripcion.unsubscribe();
    console.log('La pagina se va a cerrar');
  }


  regresaObservable(): Observable<any> {
    // let  observa =  new Observable( (observer) => {

    return  new Observable( (observer: any) => {
      let contador = 0;
      let intervalo = setInterval(() => {
        contador = contador + 1;
        const salida = {
          valor: contador
        };

        // observer.next(contador); // va estar notificando, emitir un valor
        observer.next(salida);
        // console.log(salida);
        // if (contador === 2) {
        //   // clearInterval(intervalo);
        //   observer.error('ERROR');
        // }

        // if (contador === 3) {
        //   clearInterval(intervalo);
        //   observer.complete(); // terminar el observable
        // }

      }, 1000);
  }).pipe( map((res: any) => {
    return res.valor;
  }),
  // filter(() => {
  //   return true;
  // })
  filter((valor, index) => {
    // console.log('Filter valorRespuesta: ', valor);
    // console.log('Filter indexNumeroDeVecesEnBase0QueRecibeDelObservador: ', index);
    // return true;

    if (valor % 2 === 1) {
      // Impar
      return true;
    } else {
      // Par
      return false;
    }
  }));

    // return observa;
  }

}








/*
export class RxjsComponent implements OnInit {

  constructor() {

    // let  observa =  new Observable( (observer) => {
    //     let contador = 0;
    //     let intervalo = setInterval(() => {
    //       contador = contador + 1;
    //       observer.next(contador); // va estar notificando, emitir un valor

    //       if (contador === 2) {
    //         // clearInterval(intervalo);
    //         observer.error('ERROR');
    //       }

    //       if (contador === 3) {
    //         clearInterval(intervalo);
    //         observer.complete(); // terminar el observable
    //       }
    //     }, 1000);
    // });

    // // 3 Callbacks 1(next), 2(eror) y 3(cuando termina)
    // // observa.subscribe( (numero) => {
    // //     console.log('Subscripcion: ', numero);
    // // },
    // // (error) => {
    // //   console.log('Error de Subscripcion: ', error);
    // // },
    // // () => {
    // //   console.log('Subscripcion termino');
    // // });

    // Con retry
    // this.regresaObservable().pipe(
    //   // retry()
    //   retry(2)
    // ).subscribe( (numero) => {
    //   console.log('Subscripcion: ', numero);
    // },
    // (error) => {
    //   console.log('Error de Subscripcion: ', error);
    // },
    // () => {
    //   console.log('Subscripcion termino');
    // });


    // Con map
    this.regresaObservable().subscribe( (numero) => {
      console.log('Subscripcion: ', numero);
    },
    (error) => {
      console.log('Error de Subscripcion: ', error);
    },
    () => {
      console.log('Subscripcion termino');
    });

  }

  ngOnInit() {
  }


  regresaObservable(): Observable<any> {
    // let  observa =  new Observable( (observer) => {

    return  new Observable( (observer: any) => {
      let contador = 0;
      let intervalo = setInterval(() => {
        contador = contador + 1;
        const salida = {
          valor: contador
        };

        // observer.next(contador); // va estar notificando, emitir un valor
        observer.next(salida);
        // console.log(salida);
        // if (contador === 2) {
        //   // clearInterval(intervalo);
        //   observer.error('ERROR');
        // }

        if (contador === 3) {
          clearInterval(intervalo);
          observer.complete(); // terminar el observable
        }

      }, 1000);
  }).pipe( map((res: any) => {
    return res.valor;
  }),
  // filter(() => {
  //   return true;
  // })
  filter((valor, index) => {
    // console.log('Filter valorRespuesta: ', valor);
    // console.log('Filter indexNumeroDeVecesEnBase0QueRecibeDelObservador: ', index);
    // return true;

    if (valor % 2 === 1) {
      // Impar
      return true;
    } else {
      // Par
      return false;
    }
  }));

    // return observa;
  }

}




*/
