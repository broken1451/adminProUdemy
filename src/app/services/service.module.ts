import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService, SharedService, SidebarService, UsuarioService, LoginGuardGuard, SubirArchivoService, 
        ModalUploadService, HospitalService, MedicoService} from './services.index';
import { HttpClientModule } from '@angular/common/http';
// import { LoginGuardGuard } from './guards/login-guard.guard';
// import { ModalUploadService } from '../components/modal-upload/modal-upload.service';







@NgModule({
  declarations: [],
  providers: [SettingsService, SharedService, SidebarService, UsuarioService, LoginGuardGuard, SubirArchivoService, 
              ModalUploadService, HospitalService, MedicoService],
  imports: [
    CommonModule,
    HttpClientModule
  ],
})
export class ServiceModule { }
