import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService, SharedService, SidebarService, UsuarioService, LoginGuardGuard } from './services.index';
import { HttpClientModule } from '@angular/common/http';
// import { LoginGuardGuard } from './guards/login-guard.guard';







@NgModule({
  declarations: [],
  providers: [SettingsService, SharedService, SidebarService, UsuarioService, LoginGuardGuard],
  imports: [
    CommonModule,
    HttpClientModule
  ],
})
export class ServiceModule { }
