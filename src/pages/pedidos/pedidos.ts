import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { PedidosProvider } from './../../providers/pedidos/pedidos';


@IonicPage()
@Component({
	selector: "page-pedidos",
	templateUrl: "pedidos.html",
})
export class PedidosPage {
	pedidos: any[] = [];
	pedidosEsp: any [] = [];
	tab1: any;
	tab2: any;

	constructor( public navCtrl: NavController,public navParams: NavParams,private menuCtrl: MenuController,private _ps: PedidosProvider) {
		this.tab1 = 'Tab1Page';
		this.tab2 = 'Tab2Page';
	}

	ionViewDidLoad() {
		this._ps.obtener_pedidos().subscribe((data: any) => {
			console.log(data);
			this.pedidos = data.pedidos;
			//console.log(this.pedidos);
		});

		this._ps.obtener_pedidos_especiales().subscribe((data:any) => {
			this.pedidosEsp = data.pedidos;
			//console.log(this.pedidosEsp);
		});
	}

	abrirmenu() {
		this.menuCtrl.toggle();
	}

	detalle(item) {
		console.log("item", item);
	}
}
