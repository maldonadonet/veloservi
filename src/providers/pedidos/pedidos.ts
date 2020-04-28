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

	pedido_esp( nombre_sucursal: string, direccion_sucursal: string, productos:string, dir_entrega ) {
		this.token = this._us.token;
		let usuario = JSON.parse(this._us.User);

		let url =
			URL_SERVICIOS + `/crear_pedido_especial/${usuario.id}/${this._us.token}`;

		return this.http.post( url, {nombre_sucursal, direccion_sucursal, productos, dir_entrega}).map( resp => {
			let data_resp = resp;
			console.log( data_resp);

			if (data_resp['error']) {
                this.alertCtrl
                    .create({
                        title: "Error al Iniciar",
                        subTitle: data_resp["message"],
                        buttons: ["Ok"]
                    })
                    .present();
            } else {
                this.alertCtrl
                    .create({
                        title: 'Pedido registrado correctamente',
                        subTitle: "Favor de ir al menu principal a la zona de pedidos, para ver el estatus del mismo.",
                        buttons: ["Ok"]
                    })
                    .present();
            }

		});
	}

	crear_pedido(data:any, total){

		// var personales
		this.token = this._us.token;
		let usuario = JSON.parse(this._us.User);
		let url = URL_SERVICIOS + `/crear_pedido/${usuario.id}/${this._us.token}`;
		// Areglos
		let arrayCant: any [] = [];
		let arrIds: any [] = [];
		let arrAsociados: any [] = [];
		let arrCostos: any[] = [];

		data.forEach( (item:any) => {
			arrayCant.push( item.cantidad );
			arrIds.push( item.producto.id );
			arrAsociados.push( item.producto.usuario_id);
			arrCostos.push( item.producto.precio);
		});

		let cantidades = arrayCant.toString();
		let ids = arrIds.toString();
		let asociados = arrAsociados.toString();
		let costos = arrCostos.toString();		

		return this.http.post(url, {cantidades,ids,total,asociados,costos}).map((resp)=>{

				let data_resp = resp;

				if (data_resp["error"]) {
					this.alertCtrl
						.create({
							title: "Error al enviar tu pedido",
							subTitle: 'favor de revisar tu conexión a internet',
							buttons: ["Ok"],
						})
						.present();
				} else {
					this.alertCtrl
						.create({
							title: "Pedido registrado correctamente",
							subTitle: "Favor de ir al menu principal a la zona de pedidos, para ver el estatus del mismo.",
							buttons: ["Ok"],
						})
						.present();
				}
			});

	}

	obtener_pedidos() {
		this.token = this._us.token;
		let usuario = JSON.parse(this._us.User);

		let url = URL_SERVICIOS + `/historial_pedidos/${usuario.id}/${this._us.token}`;

		return this.http.get(url);
	}

	obtener_pedidos_especiales() {
		this.token = this._us.token;
		let usuario = JSON.parse(this._us.User);

		let url = URL_SERVICIOS + `/historial_pedidos_especiales/${usuario.id}/${this._us.token}`;

		return this.http.get(url);
	}
}
