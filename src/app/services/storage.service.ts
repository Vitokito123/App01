import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences'; 
const llaveuber = "llaveaplicacionuber";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async setItem(llave:string,valor:string) {
    await Preferences.set({key:llave,value:valor});
  }

  async getItem(llave:string): Promise <string | null>{
    const obj = await Preferences.get({key:llave});
    return obj.value;
  }

  async agregartoken(dataJson:any) {
    this.setItem(llaveuber,JSON.stringify(dataJson));
  }

  async obtenerStorage(){
    const storageData = await this.getItem(llaveuber);
    if(storageData == null) {
      return [];
    }else{
      return JSON.parse(storageData);
    }
  }



}
