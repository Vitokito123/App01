import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/usuario';
import { FirebaseService } from 'src/app/services/firebase.service';
import { HelperService } from 'src/app/services/helper.service';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  correo:string = "vhr@vhr.cl";
  contrasena:string = "12345678910";
  token:string ="";
  usuario:UserModel[] = [];





  constructor(private router:Router, 
              private firebase:FirebaseService, 
              private helper:HelperService,
              private storage:StorageService,
              private usuarioService:UsuarioService
            
            ) { }

  ngOnInit() {
  }


  async login(){
  
    if (this.correo == "") {
      this.helper.showAlert("Ingrese el correo", "Error de validación");
      return;
    }
    if (this.contrasena == "") {
      this.helper.showAlert("Ingrese la contraseña", "Error de validación");
      return;
    }

    const loader = await this.helper.showLoader("Cargando");
    try {

       const reqFirebase = await this.firebase.login(this.correo,this.contrasena);

       const token = await reqFirebase.user?.getIdToken();

       if (token) {
        this.token = token;
        const req = await this.usuarioService.obtenerUsuario(
          {
            p_correo:this.correo,
            token:token
          }
        );
        this.usuario = req.data;
        console.log("DATA USUARIO", this.usuario[0].id_usuario);
       }
      


       loader.dismiss();  

    }catch (error:any) {
      let msg = "error al inciar sesion";

      if(error.code == "auth/invalid-credential"){
        msg="Credenciales incorrectas"
      }else if(error.code =="auth/wrong-password"){
        msg="contraseña incorrecta";
      }else if(error.code == " auth/invalid-email"){
        msg="email incorrecto";
      }



      this.helper.showAlert(msg,"okkeeeiii");
      loader.dismiss();
    }

    const jsonToken = 
    [
      {
        "token":this.token,
        "usuario_id":this.usuario[0].id_usuario,
        "usuario_correo":this.usuario[0].correo_electronico
      }
    ]; 
    
    this.storage.agregartoken(jsonToken);



    let token = await this.storage.obtenerStorage();
    console.log(token[0].usuario_correo);
    
    await this.helper.showToast("Login correcto!!!!!");
    this.router.navigateByUrl("/inicio");
  }

  resetPw(){
    this.router.navigateByUrl("reset-password");
  }

  registro(){
    this.router.navigateByUrl("registro");
  }

}
