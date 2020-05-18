import { Component } from "@angular/core";
import { PedidosProvider } from '../../providers/pedidos/pedidos';
import {
	IonicPage,
	NavController,
	NavParams,
	ToastController,
} from "ionic-angular";

@IonicPage()
@Component({
	selector: "page-pedido-especial",
	templateUrl: "pedido-especial.html",
})
export class PedidoEspecialPage {
	nombre_sucursal: string = "";
	dir_sucursal: string = "";
	productos: string = "";
    dir_entrega: string = "";
    
	pushPage: any;
	habilitado: boolean = false;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
    	private toastCtrl: ToastController,
    	private _ps: PedidosProvider
	) {
		this.pushPage = "ProductsPage";
	}

	ionViewDidLoad() {}

	pedido_esp() {
		if (this.nombre_sucursal.length != 0 && this.dir_sucursal.length != 0 && this.productos.length != 0 && this.dir_entrega.length != 0) {

			this._ps.pedido_esp(this.nombre_sucursal, this.dir_sucursal, this.productos, this.dir_entrega)
				.subscribe(()=>{
        			this.navCtrl.push('ProductsPage');
      			});

		} else {
			const toast = this.toastCtrl.create({
				message: "Debes rellenar todos los campos",
				duration: 3000,
			});

			toast.present();
		}
	}

}
