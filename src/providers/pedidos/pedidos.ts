import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertController, Platform } from "ionic-angular";
import { URL_SERVICIOS } from "../../config/url.servicios";
import { Storage } from "@ionic/storage";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { Observable } from "rxjs/Observable";
import { ApiUsersProvider } from "../api-users/api-users";

@Injectable()
export class PedidosProvider {

	token:any;

	constructor(
		public http: HttpClient,
		private alertCtrl: AlertController,
		private platform: Platform,
		private storage: Storage,
		private _us: ApiUsersProvider
	) {
		console.log("Pedidos Provider");
	}

	pedido_esp( nombre_suc: string, dir_sucursal: string, productos:string ) {
		this.token = this._us.token;
		let usuario = JSON.parse(this._us.User);

		let url =
			URL_SERVICIOS + `/pedido_especial/${usuario.id}/${this._us.token}`;

		return this.http.post( url, {nombre_suc, dir_sucursal, productos}).map( resp => {
			let data_resp = resp;
			console.log( data_resp);
		});
	}
}
