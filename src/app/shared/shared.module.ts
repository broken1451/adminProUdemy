import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcumbsComponent } from './breadcumbs/breadcumbs.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../pipes/pipes.module';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';


@NgModule({
  declarations: [
    BreadcumbsComponent,
    HeaderComponent,
    NopagefoundComponent,
    SidebarComponent,
    // Con Lazyload
    ModalUploadComponent
  ],
  exports: [
    BreadcumbsComponent,
    HeaderComponent,
    NopagefoundComponent,
    SidebarComponent,
    // Con Lazyload
    ModalUploadComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    PipesModule
  ]
})
export class SharedModule { }
