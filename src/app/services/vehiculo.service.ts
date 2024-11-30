import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  constructor(private http:HttpClient) { }

  async agregarVehiculo(datosVehiculo:dataBodyVehiculo,imgFileUser:any){
    try{  
        const formData = new FormData();

        formData.append('p_id_usuario', datosVehiculo.p_id_usuario);
        formData.append('p_patente', datosVehiculo.p_patente);
        formData.append('p_marca', datosVehiculo.p_marca);
        formData.append('p_modelo', datosVehiculo.p_modelo);
        formData.append('p_anio', datosVehiculo.p_anio);
        formData.append('p_color', datosVehiculo.p_color);
        formData.append('p_tipo_combustible', datosVehiculo.p_tipo_combustible);
        formData.append('p_capacidad_pasajeros', datosVehiculo.p_capacidad_pasajeros);
        if (datosVehiculo.token) {
          formData.append('token',datosVehiculo.token);
        }

          formData.append('image_usuario', imgFileUser.file, imgFileUser.name);

          const response = await lastValueFrom(this.http.post<any>(environment.apiUrl + 'vehiculo/agregar',formData));
          return response;
            

    } catch (error) {
      throw error;
    }
}
}

interface dataBodyVehiculo{
  p_id_usuario:string;
  p_patente:string;
  p_marca:string;
  p_modelo:string;
  p_anio:string;
  p_color:string;
  p_tipo_combustible:string;
  p_capacidad_pasajeros:string;
  token:string;
}