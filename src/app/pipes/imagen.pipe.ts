import { Pipe, PipeTransform } from '@angular/core';
import { URLSERVICIO } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(imagen: string, tipoImagen: string = 'usuarios'): any {
    console.log('imagen: ', imagen);
    console.log('tipoImagen: ', tipoImagen);
    let url = URLSERVICIO + '/imagen'; // llamada al servicio

    if (!imagen) {
      return url + '/usuarios/xxx';
    }

    if (imagen.indexOf('https') >= 0 ) {
      return imagen;
    }


    if (tipoImagen === 'usuarios' ) {
       url = url + '/usuarios/' + imagen;
    } else if (tipoImagen === 'medicos') {
       url = url + '/medicos/' + imagen;
    } else if (tipoImagen === 'hospitales') {
       url = url + '/hospitales/' + imagen;
    } else {
      console.log('No existe este tipo de imagen, los tipos de imagenes son usuarios, hospitales y medicos');
      url = url + '/usuarios/xxx';
    }

    // switch (tipoImagen) {
    //   case 'usuarios':
    //     url = url + '/usuarios' + imagen;
    //     break;
    //   case 'medicos':
    //     url = url + '/medicos' + imagen;
    //     break;
    //   case 'hospitales':
    //     url = url + '/hospitales' + imagen;
    //     break;
    //   default:
    //     console.log('No existe este tipo de imagen, los tipos de imagenes son usuarios, hospitales y medicos')
    //     url = url + '/usuarios/xxx';
    //     break;
    // }

    return url;
  }

}

