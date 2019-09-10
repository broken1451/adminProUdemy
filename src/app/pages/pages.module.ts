import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';

// Temporal
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';

// Modulos
import { SharedModule } from '../shared/shared.module';

// ng2 - charts
import { ChartsModule } from 'ng2-charts';

// Modulo de rutas Hijas
import { PagesRoute } from './pages.routes';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
  // import { pagesRoute } from './pages.routes';



@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    PagesComponent,
    IncrementadorComponent,
    GraficoDonaComponent,

  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    PagesComponent,
    IncrementadorComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    PagesRoute,
    FormsModule,
    ChartsModule
    // pagesRoute
  ]
})
export class PagesModule { }
