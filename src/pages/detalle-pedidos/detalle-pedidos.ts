import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-detalle-pedidos',
  templateUrl: 'detalle-pedidos.html',
})
export class DetallePedidosPage {

  items:any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.items = this.navParams.get("items");    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetallePedidosPage');
    console.log(this.items);
  }

}
