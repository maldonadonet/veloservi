import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertController, Platform } from "ionic-angular";
import { URL_SERVICIOS } from "../../config/url.servicios";
import { Storage } from "@ionic/storage";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { Observable } from "rxjs/Observable";
import { ApiUsersProvider } from '../api-users/api-users';

@Injectable()
export class ApiProductsProvider {
	productos: any[] = [];
	otrosProductos: any[] = [];
	id_usuario: any;
	token: any;

	constructor(
		public http: HttpClient,
		private alertCtrl: AlertController,
		private platform: Platform,
		private storage: Storage,
		private _us: ApiUsersProvider
	) {
		console.log("Servicio Productos");
	}

	private guardar_storage() {
		if (this.platform.is("cordova")) {
			this.storage.set("productos", this.productos);
			this.storage.set("otrosProductos", this.otrosProductos);
		} else {
			localStorage.setItem("productos", JSON.stringify(this.productos));
			localStorage.setItem(
				"otrosProductos",
				JSON.stringify(this.otrosProductos)
			);
		}
	}

	// Metodo Cargar datos del Storage
	cargar_storage() {
		let promesa = new Promise((resolve, reject) => {
			if (this.platform.is("cordova")) {
				this.storage.ready().then(() => {
					this.storage.get("productos").then(productos => {
						if (productos) {
							this.productos = productos;
						}
					});

					this.storage.get("otrosProductos").then(otrosProductos => {
						if (otrosProductos) {
							this.otrosProductos = otrosProductos;
						}
						resolve();
					});
				});
			} else {
				if (localStorage.getItem("productos")) {
					//Existe items en el localstorage
					this.productos = JSON.parse(
						localStorage.getItem("productos")
					);
				}
				if (localStorage.getItem("otrosProductos")) {
					//Existe items en el localstorage
					this.otrosProductos = JSON.parse(
						localStorage.getItem("otrosProductos")
					);
				}
				resolve();
			}
		});
		return promesa;
	}

	getProducts() {
		//this._us.cargar_storage();
		this.token = this._us.token;
		let usuario = JSON.parse(this._us.User);

		let url = `${URL_SERVICIOS}/listado_productos/${usuario.id}/${this._us.token}`;

		this.http.get(url).subscribe(data => {
			let data_resp = data;
			//console.log(data);

			if (data_resp["error"]) {
				console.log("Encontro un error");
			} else {
				this.productos = data_resp["data"];
				//console.log(this.productos);
			}
		});
	}

	nextPage(page) {
		this._us.cargar_storage();
		this.token = this._us.token;
		let usuario = JSON.parse(this._us.User);

		let url = `${URL_SERVICIOS}/listado_productos/${usuario.id}/${this._us.token}?page=${page}`;

		this.http.get(url).subscribe(data => {
			let data_resp = data;
			//console.log(data);

			if (data_resp["error"]) {
				console.log("Encontro un error");
			} else {
				this.productos = data_resp["data"];
			}
		});
	}

	filtrarCategoria(categoria:string) {
        this._us.cargar_storage();
		this.token = this._us.token;
		let usuario = JSON.parse(this._us.User);

		let url = `${URL_SERVICIOS}/listado_productos/${usuario.id}/${this._us.token}/${categoria}`;

		this.http.get(url).subscribe(data => {
			let data_resp = data;
			//console.log(data);

			if (data_resp["error"]) {
				console.log("Encontro un error");
			} else {
				this.productos = data_resp["data"];
				console.log(this.productos);
			}
		});
    }

	actualizar_productos(){
        this.productos = null;
        this.guardar_storage();
        this.productos = this.otrosProductos;
        this.guardar_storage();
    }
}
