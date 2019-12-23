import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(public usuarioService: UsuarioService,
              public router: Router) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.usuarioService.usuario.role === 'ADMIN_ROLE') {
      return true;
    } else {
    Swal.fire('Bloqueado', 'Bloqueado por el admin guard no tiene permisos para ver esta pagina', 'info');
    this.router.navigate(['/login']);
    console.log('Bloqueado por el adminGuard');
    return false;
    }

  }

}
