import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { PedidosProvider } from './../../providers/pedidos/pedidos';


@IonicPage()
@Component({
  selector: 'page-pedidos',
  templateUrl: 'pedidos.html',
})
export class PedidosPage {

  pedidos: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController, private _ps: PedidosProvider) {
    
  }

  ionViewDidLoad() {
    this._ps.obtener_pedidos().subscribe((data:any)=>{
      this.pedidos = data.pedidos;
      console.log(this.pedidos);    
    });
  }

  abrirmenu(){
    this.menuCtrl.toggle();
  }

  detalle(item) {
    console.log('item', item);
  }
}
