import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from "ionic-angular";

import { ApiUsersProvider } from '../../providers/api-users/api-users';


@IonicPage()
@Component({
    selector: "page-login",
    templateUrl: "login.html"
})
export class LoginPage {

    usuario: string = '';
    password: string = '';

    constructor(public navCtrl: NavController, public navParams: NavParams, private _us: ApiUsersProvider, public loadingCtrl : LoadingController, public alertCtrl: AlertController) {}

    ionViewDidLoad() {
        console.log("ionViewDidLoad LoginPage");
    }

    cancelar(){
        this.navCtrl.setRoot('WelcomePage');
    }

    ingresar(){
      
      let loading = this.loadingCtrl.create({
        content: 'Estableciendo conexión con el servidor..'
      });

      loading.present();

      this._us.login(this.usuario, this.password)
        .subscribe(()=>{
          
          if (this._us.usuario_activo()) {
              this.navCtrl.push("ProductsPage");
              loading.dismiss();
          } else {
              loading.dismiss();
              this.limpiar();
          }

        })
    }

    limpiar(){
      this.password = "";
    }
}
