import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Camera, CameraResultType } from '@capacitor/camera';
import { UsuarioService } from 'src/app/services/usuario.service';
import { HelperService } from 'src/app/services/helper.service';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  correo:string = "";
  contrasena:string = "";
  imagen:any;
  nombre:string="";
  telefono:string="";


  constructor(private firebase:FirebaseService,
              private usuarioService:UsuarioService,
              private helper:HelperService,
              private router:Router
  ) { }

  ngOnInit() {
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



  
  async registro(){
    const userFirebase=await this.firebase.registro(this.correo,this.contrasena);
    const Token = await userFirebase.user?.getIdToken();
    console.log("token=",Token);
    if(Token){
      const req = await this.usuarioService.agregarUsuario(
      {
        p_correo_electronico:this.correo,
        p_nombre:this.nombre,
        p_telefono:this.telefono,
        token:Token
      },
      this.imagen
    );
  }
  await this.helper.showAlert("Usuario OK","usuraio ok")
  await this.router.navigateByUrl('login');
}
}
