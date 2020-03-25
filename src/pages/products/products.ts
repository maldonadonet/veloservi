import { Component } from '@angular/core';
import { IonicPage,NavController,LoadingController,AlertController} from "ionic-angular";
// Provider Users
import { ApiUsersProvider } from '../../providers/api-users/api-users';
import { ApiProductsProvider } from '../../providers/api-products/api-products';



@IonicPage()
@Component({
	selector: "page-products",
	templateUrl: "products.html"
})
export class ProductsPage {
	usuario: any[] = [];
	productos: any[] = [];
	page: number = 1;
	carrito: any[] = [];

	constructor(
		public navCtrl: NavController,
		public _us: ApiUsersProvider,
		public _ps: ApiProductsProvider,
		public loadingCtrl: LoadingController,
		public alertCtrl: AlertController
	) {
		this._us.cargar_storage();
		this.usuario = JSON.parse(this._us.User);
	}

	ionViewDidLoad() {
		let loading = this.loadingCtrl.create({
			content: "Cargando productos..."
		});

		loading.present();

		this._ps.getProducts().subscribe((data: any) => {
			this.productos = data.data.data;
			loading.dismiss();
		});
	}

	salir() {
		this._us.cerrar_sesion();
		this.navCtrl.setRoot("HomePage");
	}

	filtrar_categoria() {
		this.filtrar();
	}

	filtrar() {
		let alert = this.alertCtrl.create();
		alert.setTitle("Filtrar por Categoría");

		alert.addInput({
			type: "radio",
			label: "Farmacia",
			value: "Farmacia",
			checked: false
		});
		alert.addInput({
			type: "radio",
			label: "Ropa",
			value: "Ropa",
			checked: false
		});
		alert.addInput({
			type: "radio",
			label: "Tienda",
			value: "Tienda",
			checked: false
		});
		alert.addInput({
			type: "radio",
			label: "Zapatos",
			value: "Zapatos",
			checked: false
		});

		alert.addButton("Cancel");
		alert.addButton({
			text: "Filtrar",
			handler: data => {
				console.log(data);
				if (data == undefined) {
					return;
				} else {
					this._ps.filtrarCategoria(data).subscribe((data: any) => {
						console.log("Categoria: ", data.data.data);
						this.productos = data.data.data;
					});
				}
			}
		});
		alert.present();
	}

	loadData(event) {
		console.log("Cargando productos");
		let newData: string[] = [];

		setTimeout(() => {
			this._ps.nextPage(2).subscribe((data: any) => {
				for (let i = 0; i <= data.data.data.length; i++) {
					newData.push(data.data.data[i]);
				}

				console.log(newData);

				event.complete();
			});
		}, 1000);
	}

	addCarrito(item) {
		this.abrirModal(item);
	}

	abrirModal(item) {
		const prompt = this.alertCtrl.create({
			title: "Agregar al Carrito",
			message: "Confirmación de datos",
			inputs: [
				{
					name: "cantidad",
					placeholder: "Cantidad",
					type: "number"
				}
			],
			buttons: [
				{
					text: "Cancelar",
					handler: data => {
						console.log("Cancel clicked");
					}
				},
				{
					text: "Agregar",
					handler: data => {
						console.log("Cantidad: ", data);
						console.log("Product_id: ", item.id);
						this.carrito.push({
							producto: item,
							cantidad: data.cantidad
						});
						console.log(this.carrito);
					}
				}
			]
		});
		prompt.present();
	}

	irCarrito(){
		this.navCtrl.push('CarritoPage',{
			'data' : this.carrito
		});
	}
}
