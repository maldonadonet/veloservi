import { Component, OnInit } from '@angular/core';
import { IonicPage,NavController,NavParams,LoadingController} from "ionic-angular";
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
	constructor(public navCtrl: NavController,public navParams: NavParams,public _us: ApiUsersProvider,public _ps:ApiProductsProvider,
		public loadingCtrl: LoadingController
	) {
		this._us.cargar_storage();
		this.usuario = JSON.parse(this._us.User);

		this._ps.getProducts();
        
	}

	ionViewDidLoad() {
		let loading = this.loadingCtrl.create({
			content: "Cargando productos..."
		});

		loading.present();

		this._ps.getProducts();
		this.productos = this._ps.productos;

		if (this._ps.productos) {
			console.log("Productos cargados");
            this.productos = this._ps.productos;
            loading.dismiss();
		} else {
			console.log("AUN no tenemos los productos");
		}
	}

	salir() {
		this._us.cerrar_sesion();
		this.navCtrl.push("WelcomePage");
	}

	filtrar_categoria() {
		this._ps.filtrarCategoria("farmacia");
		this.productos = this._ps.productos;
	}

	loadData(event) {
        console.log("Cargando productos");
        setTimeout(() => {
            this._ps.nextPage(2);
            event.complete();
            console.log(this.productos);
        }, 500);

	}
}
