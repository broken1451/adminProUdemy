import { Injectable } from '@angular/core';
import { URLSERVICIO } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() {}

  subirArchivo(archivo: File, tipoImagen: string, id: string) { // tipo de imagen es usuarios,medicos o hospitales , id del objeto a actualizar

   return new Promise( (resolve, reject) => {

      let formData = new FormData(); // esto es todo el payload que quiero mandar a subir
      let xhr = new XMLHttpRequest(); // inicializar la peticion ajax

      // Configuracion del formData
      // formData.append('nombre q esta en el postman opcion fromdata para subir la imagens', archivo que quiero subir, nombre del archivo)
      formData.append('imagen', archivo, archivo.name);

      // Configuracion de la peticion ajax
      xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              // resolve('Imagen Subida exitosamente' mandar el response exitoso);
              // resolve(xhr.response);
              resolve(JSON.parse(xhr.response));
              console.log('Imagen subida: ', xhr.response);
            } else {
              // reject('Imagen Subida exitosamente' mandar el response exitoso);
              // reject(xhr.response);
              reject(JSON.parse(xhr.response));
              console.log(' Error Imagen no subida: ', xhr.response);
            }
          }
      };
    // Peticion al servicio
      let url = URLSERVICIO + `/upload/${tipoImagen}/${id}`;
      // xhr.open('metodo', peticion de servicio, decidir si es asincrono o no);
      xhr.open('PUT', url, true);
      xhr.send(formData);
  });

  }


}
