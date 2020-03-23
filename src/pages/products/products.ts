import { Component } from '@angular/core';
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

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private _us: ApiUsersProvider,
        private _ps: ApiProductsProvider,
        public loadingCtrl: LoadingController
    ) {
        this._us.cargar_storage();
        this.usuario = JSON.parse(this._us.User);
    }

    ionViewDidLoad() {
        let loading = this.loadingCtrl.create({
            content: "Cargando productos..."
        });

        loading.present();

        this._ps.getProducts();
        this._ps.cargar_storage();
        loading.dismiss();
        if (this._ps.productos) {
            console.log("Productos cargados");
            this.productos = this._ps.productos;
            console.log("Productos_page: ", this.productos);
        } else {
            console.log("AUN no tenemos los productos");
        }
    }

    salir(){
      this._us.cerrar_sesion();
      this.navCtrl.push('WelcomePage');
    }
}
