import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Importar codigo fuera de angular plugings/funciones/jquery/etc
declare function initPlugings();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
    initPlugings();
  }
// ng g c components/nombrecomponente --module=app.module --spec=false
  ingresar() {
    this.router.navigate(['/dashboard']);
    console.log('Ingresando...');
  }
}
