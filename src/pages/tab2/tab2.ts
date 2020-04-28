import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidosProvider } from "./../../providers/pedidos/pedidos";


@IonicPage()
@Component({
    selector: "page-tab2",
    templateUrl: "tab2.html",
})
export class Tab2Page {
    pedidos: any[] = [];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private _ps: PedidosProvider
    ) {}

    ionViewDidLoad() {
        this._ps.obtener_pedidos_especiales().subscribe((data: any) => {
            this.pedidos = data.pedidos;
            console.log(this.pedidos);
        });
    }

    detalle(item: any) {
		console.log('item enviado: ',item);
        this.navCtrl.push("DetallePedidoEspPage", {
            item: item,
        });
    }
}
