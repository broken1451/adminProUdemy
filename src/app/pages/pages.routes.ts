import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PormesasComponent } from './pormesas/pormesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/services.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';

const pagesroutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuardGuard],
        children: [
          { path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard', descrip: 'Esto es la pagina principal'} },
          { path: 'progress', component: ProgressComponent, data: {titulo: 'Barra de Progreso', descrip: 'Esto es la pagina de barras'} },
          { path: 'graficas1', component: Graficas1Component, data: {titulo: 'Graficas', descrip: 'Esto es la pagina graficas'} },
          { path: 'promesas', component: PormesasComponent, data: {titulo: 'Promesas', descrip: 'Esto es la pagina de promesas'} },
          { path: 'rxjs', component: RxjsComponent, data: {titulo: 'Reactividad con Rxjs', descrip: 'Esto es la pagina de los observables'} },
          { path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Configuraciones del tema', descrip: 'Esto es la pagina de configuracion de temas'} },
          { path: 'perfil', component: ProfileComponent, data: {titulo: 'Perfil de usuario'} },

          // Mantenmiento
          { path: 'usuarios', component: UsuariosComponent, data: {titulo: 'Mantenimiento de Usuarios'} },
          { path: 'hospitales', component: HospitalesComponent, data: {titulo: 'Mantenimiento de Hospitales'} },
          { path: 'medicos', component: MedicosComponent, data: {titulo: 'Mantenimiento de Medicos'} },
          { path: 'medico/:id', component: MedicoComponent, data: {titulo: 'Actualizar medico'} },
          { path: '', pathMatch: 'full' , redirectTo: 'dashboard' },
        ]
       }

];

@NgModule({
    imports: [RouterModule.forChild(pagesroutes)],
    exports: [RouterModule]
})
export class PagesRoute {}
// export const pagesRoute = RouterModule.forChild(pagesroutes);


// 2 manera
// export const childrenRoutes: Routes = [

//      { path: 'dashboard', component: DashboardComponent },
//      { path: 'progress', component: ProgressComponent },
//      { path: 'graficas1', component: Graficas1Component },
//      { path: '', pathMatch: 'full' , redirectTo: 'dashboard' }

// ];

