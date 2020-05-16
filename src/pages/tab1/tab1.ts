import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidosProvider } from "./../../providers/pedidos/pedidos";


@IonicPage()
@Component({
	selector: "page-tab1",
	templateUrl: "tab1.html",
})
export class Tab1Page {
  pedidos: any[] = [];
  
	constructor( public navCtrl: NavController, public navParams: NavParams, private _ps: PedidosProvider ) {}

	ionViewDidLoad() {
		this._ps.obtener_pedidos().subscribe((data: any) => {
			this.pedidos = data.pedidos;
			console.log('Pedidos=>',this.pedidos);
		});
  }
  
  detalle(item:any){
	console.log(item);
	this.navCtrl.push("DetallePedidosPage",{
		items: item
	});
  }
}
