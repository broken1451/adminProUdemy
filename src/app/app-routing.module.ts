import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';
import { LoginGuardGuard } from './services/services.index';

const routes: Routes = [

// De forma normal sin lazyLoad
  // { path: 'login', component: LoginComponent },
  // { path: 'register', component: RegisterComponent },
  // { path: '**', component: NopagefoundComponent },


 // ===============================================================================================
 // =================================== Con LazyLoad ==============================================
 // ===============================================================================================
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '',
    component: PagesComponent,
    canActivate: [LoginGuardGuard],
    // loadChildren: 'path al modulo que quiero cargar de forma dinamica#nombre exacto al modulo '
    loadChildren: './pages/pages.module#PagesModule'

  },
  { path: '**', component: NopagefoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }










/*
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { PagesComponent } from './pages/pages.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { LoginComponent } from './login/login.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Graficas1Component } from './pages/graficas1/graficas1.component';
import { RegisterComponent } from './login/register.component';



const routes: Routes = [
//   { // sin nungun modulo, solo funciona con el modulo principal
//     path: '',
//     component: PagesComponent,
//     children: [
//       { path: 'dashboard', component: DashboardComponent },
//       { path: 'progress', component: ProgressComponent },
//       { path: 'graficas1', component: Graficas1Component },
//       { path: '', pathMatch: 'full' , redirectTo: 'dashboard' },
//     ]
//    },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: NopagefoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

*/

