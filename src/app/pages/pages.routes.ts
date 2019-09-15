import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

const pagesroutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
          { path: 'dashboard', component: DashboardComponent },
          { path: 'progress', component: ProgressComponent },
          { path: 'graficas1', component: Graficas1Component },
          { path: 'account-settings', component: AccountSettingsComponent },
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

