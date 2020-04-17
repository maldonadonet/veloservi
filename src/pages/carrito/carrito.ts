import { Component } from "@angular/core";
import {
	IonicPage,
	NavController,
	NavParams,
	AlertController,
} from "ionic-angular";

@IonicPage()
@Component({
	selector: "page-carrito",
	templateUrl: "carrito.html",
})
export class CarritoPage {
	data: any[] = [];
	total = 0;
	cupon: string = "";
	habilitado = true;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private alertCtrl: AlertController
	) {
		this.data = navParams.get("data");
	}

	ionViewDidLoad() {
		console.log("Data cargada: ", this.data);
		if (this.data) {
			this.data.forEach((element) => {
				console.log("elemento del foreach: ", element);

				this.total =
					this.total + element.producto.precio * element.cantidad;

				console.log(this.total);
			});
		}
		console.log("total:", this.total);
	}

	back() {
		this.navCtrl.setRoot("ProductsPage", {
			data: "vaciar",
		});
	}

	modificarCantidad(id) {
		const prompt = this.alertCtrl.create({
			title: "Modificar cantidad",
			message: "Ingrese la cantidad de productos que necesita",
			inputs: [
				{
					name: "newcant",
					placeholder: "Cantidad a modificar",
				},
			],
			buttons: [
				{
					text: "Cancel",
					handler: (data) => {
						console.log("Cancel clicked");
					},
				},
				{
					text: "Save",
					handler: (data) => {
						console.log("Saved clicked", data);

						this.data.filter((item) => {
							console.log(item);
							if (item.producto.id == id) {
								item.cantidad = data.newcant;
							}
						});
					},
				},
			],
		});
		prompt.present();
	}

	// ELiminar item del carrito
	eliminaritem(id) {
		console.log("item", id);

		this.data.filter((item) => {
			this.data.splice(id, 1);
		});

		if (this.data.length <= 0) {
			this.total = 0;
		}
	}

	vaciarCarrito() {
		this.data = [];
		this.total = 0;
		this.back();
	}

	actualizarTotal() {
		let totales = 0;
		if (this.data) {
			this.data.forEach((element) => {
				console.log("elemento del foreach: ", element);

				totales = totales + element.producto.precio * element.cantidad;

				this.total = totales;
			});
		}
	}

	aplicarCupon() {
		if (this.cupon == "covid-19") {
			this.total = this.total - this.total * 0.15;
			this.habilitado = false;
		}
	}

	enviarPedido() {

        


    }
}
