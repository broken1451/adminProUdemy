import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcumbsComponent } from './breadcumbs/breadcumbs.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    BreadcumbsComponent,
    HeaderComponent,
    NopagefoundComponent,
    SidebarComponent,

  ],
  exports: [
    BreadcumbsComponent,
    HeaderComponent,
    NopagefoundComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
