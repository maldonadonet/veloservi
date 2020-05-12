import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, AlertController,ToastController } from "ionic-angular";
import { PedidosProvider } from '../../providers/pedidos/pedidos';


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

	constructor( public navCtrl: NavController,public navParams: NavParams,private alertCtrl: AlertController,private _ps: PedidosProvider, private toast: ToastController) {
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
                        
                        this.toast.create({
                            message: 'Cantidad modificada correctamente',
                            duration: 2000
                        }).present();

                        this.actualizarTotal();
					},
				},
			],
		});
		prompt.present();
	}

	// ELiminar item del carrito
	eliminaritem(id) {
		
        let newData = this.data.splice(id,1);
        
        this.toast.create({
            message: 'Producto eliminado del carrito',
            duration: 2000
        }).present();
        this.actualizarTotal();
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
        if(this.data.length <= 0){
            console.log('Ya no tenemos ningun producto en el carrito');
            this.total = 0;
        }
	}

	aplicarCupon() {
		if (this.cupon == "covid-19") {
			this.total = this.total - this.total * 0.15;
			this.habilitado = false;
		}
	}

	enviarPedido() {
		this._ps.crear_pedido( this.data, this.total).subscribe(()=>{
			this.data = [];
			this.total = 0;
			this.navCtrl.push('ProductsPage');
		});
	}
}
