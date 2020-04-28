import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetallePedidoEspPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalle-pedido-esp',
  templateUrl: 'detalle-pedido-esp.html',
})
export class DetallePedidoEspPage {

  pedido:any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.pedido = this.navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetallePedidoEspPage');
  }

}
