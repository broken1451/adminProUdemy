import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {


  constructor(private usuarioService: UsuarioService,
              public router: Router) {}

  canActivate(): Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('inicio de verifica token guard');
    let token = this.usuarioService.token;

    // recuperar informacion del token en base64
    let payload =  JSON.parse(atob(token.split('.')[1]));
    console.log('payload de verifica token guard: ', payload);

    let expira = this.expira(payload.exp);

    if (expira) {
      this.router.navigate(['/login']);
      return false;
    }

    return this.verificaYrenuevaToken(payload.exp);

  }


  expira(fechaExpiraToken: number) {

    let ahora  = new Date().getTime() / 1000; // transformarlo en segundos
    console.log('ahora en expira: ', ahora);
    console.log('fechaExpiraToken en expira: ', fechaExpiraToken);
    if (fechaExpiraToken < ahora) {
      return true;
    } else {
      return false;
    }

  }

  verificaYrenuevaToken(fechaExpiraToken: number): Promise<boolean> {
    return new Promise((resolve, reject) => {

      let tokenExpiracion = new Date(fechaExpiraToken * 1000); // * 1000 para transformarlo en milisegundos
      let ahora = new Date();

      ahora.setTime(ahora.getTime() + (2 * 60 * 60 * 1000) ); // si falta 2 horas para q el token caduque
      console.log('tokenExpiracion en verificaYrenuevaToken: ', tokenExpiracion);
      console.log('ahora en verificaYrenuevaToken: ', ahora);
      if (tokenExpiracion.getTime() > ahora.getTime() ) {
        resolve(true);
      } else {
        this.usuarioService.renovartoken().subscribe((data) => {
          console.log('data: ', data);
          resolve(true);
        }, ( (err: any) => {
          console.log('err: ', err);
          this.router.navigate(['/login']);
          reject(false);
        }));
      }
    });
  }

}
