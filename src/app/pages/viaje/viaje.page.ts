import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Camera, CameraResultType } from '@capacitor/camera';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { HelperService } from 'src/app/services/helper.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.page.html',
  styleUrls: ['./viaje.page.scss'],
})
export class ViajePage implements OnInit, OnDestroy {

  id:string = "";
  patente:string = "";
  marca:string = "";
  modelo:string="";
  anio:string="";
  color:string="";
  tipo_combustible:string="";
  capacidad_pasajeros:string="";
  imagen:any;
  correo:string = "vhr@vhr.cl";
  contrasena:string = "12345678910";


  constructor(private activateRoute:ActivatedRoute,
              private firebase:FirebaseService,
              private vehiculoService:VehiculoService,
              private helper:HelperService,
              private storage:StorageService
    ) { }
  

  
  ngOnDestroy(): void {
    console.log("destruyendo!!");
    
  }

  destino:string = "";

  ngOnInit() {
    this.destino = this.activateRoute.snapshot.params['destino'];
    console.log("DESTINO ", this.destino);
    
  }


  async takePhoto(){
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
    if(image.webPath){
      const response = await fetch(image.webPath);
      const blob = await response.blob();

      this.imagen= {
        fname: 'foto' + image.format,
        src:image.webPath,
        file:blob
      }
    }
    var imageUrl = image.webPath;

    this.imagen.src = imageUrl;

  }



  async registrovehiculo(){
    const reqFirebase = await this.firebase.login(this.correo,this.contrasena);

    const Token = await reqFirebase.user?.getIdToken();
    console.log("token2=",Token);
    if(Token){
      const req = await this.vehiculoService.agregarVehiculo(
      {
        p_id_usuario:this.id,
        p_patente:this.patente,
        p_marca:this.marca,
        p_modelo:this.modelo,
        p_anio:this.anio,
        p_color:this.color,
        p_tipo_combustible:this.tipo_combustible,
        p_capacidad_pasajeros:this.capacidad_pasajeros,
        token:Token
      },
      this.imagen
    );
  }
  await this.helper.showAlert("Vehiculo OK","Car ok")
}  

}




