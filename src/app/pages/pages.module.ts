import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Componentes
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { PormesasComponent } from './pormesas/pormesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

// Temporal
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

// Modulos
import { SharedModule } from '../shared/shared.module';

// ng2 - charts
import { ChartsModule } from 'ng2-charts';

// Modulo de rutas Hijas
import { PagesRoute } from './pages.routes';
  // import { pagesRoute } from './pages.routes';

// Servicios
import { SettingsService } from '../services/settings/settings.service';



@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    PagesComponent,
    IncrementadorComponent,
    GraficoDonaComponent,
    AccountSettingsComponent,
    PormesasComponent,
    RxjsComponent,

  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    PagesComponent,
    IncrementadorComponent,
    AccountSettingsComponent

  ],
  imports: [
    CommonModule,
    SharedModule,
    PagesRoute,
    FormsModule,
    ChartsModule
    // pagesRoute
  ],
  providers: [
    SettingsService
  ]
})
export class PagesModule { }
