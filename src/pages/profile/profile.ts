import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController } from 'ionic-angular';
import { Network } from "@ionic-native/network";


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController, private network: Network) {
  }

  ionViewDidLoad() {
      let desconectar = this.network.onDisconnect().subscribe(()=>{
        console.log('Estamos desconectados');
      });

      let conectar = this.network.onConnect().subscribe(()=>{
        console.log('Estamos conectados');

        setTimeout(()=> {

          if(this.network.type == 'wifi') {
            console.log( 'Estamos conectados por medio de wifi' );
          }

          if (this.network.type == "ethernet") {
						console.log("Estamos conectados por medio de ethernet");
          }
          
          if (this.network.type == "3g") {
            console.log("Estamos conectados por medio de 3G");
          }


        },3000);
      });
	}

  abrirmenu(){
    this.menuCtrl.toggle();
  }

  // watch network for a disconnection
  

}
