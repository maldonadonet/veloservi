import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertController, Platform } from "ionic-angular";
import { URL_SERVICIOS } from "../../config/url.servicios";
import { Storage } from "@ionic/storage";
import "rxjs/add/operator/map";
import { ApiUsersProvider } from '../api-users/api-users';

@Injectable()
export class ApiProductsProvider {
    productos: any[] = [];
    id_usuario:any;
    token:any;

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
        } else {
            localStorage.setItem("productos", JSON.stringify(this.productos));
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
                        resolve();
                    });
                });
            } else {
                // computadora
                if (localStorage.getItem("productos")) {
                    //Existe items en el localstorage
                    this.productos = JSON.parse(localStorage.getItem("productos"));
                }
                resolve();
            }
        });
        return promesa;
    }

    getProducts() {
      this._us.cargar_storage();
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
              this.guardar_storage();
          }
      });
    }
}
