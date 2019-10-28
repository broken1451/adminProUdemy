import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(private usuarioService: UsuarioService,
              private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean  {
    if (this.usuarioService.estaLogueado()) {
      console.log('Paso por el guard');
      return true;
    } else {
      this.router.navigate(['/login']);
      console.log('Debe estar autenticado Bloqueado');
      return false;
    }
  }

}
