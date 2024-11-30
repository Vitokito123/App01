import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  correo:string = "";

  constructor(private firebase:FirebaseService) { }

  ngOnInit() {
  }


  registro(){
    this.firebase.resetPassWord(this.correo);
  }

}
