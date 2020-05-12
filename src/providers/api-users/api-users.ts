import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, Platform } from "ionic-angular";
import { URL_SERVICIOS } from "../../config/url.servicios";
import { Storage } from "@ionic/storage";
import "rxjs/add/operator/map";


@Injectable()
export class ApiUsersProvider {
    token: string;
    User: any = {};

    constructor(public http: HttpClient,private alertCtrl: AlertController,private platform: Platform,private storage: Storage) {
        console.log("Services Provider Users");
        this.cargar_storage();
    }

    usuario_activo(): boolean {
        if (this.token) {
            return true;
        } else {
            return false;
        }
    }

    login(email: string, password: string) {
        let url = URL_SERVICIOS + "/login";

        return this.http.post(url, { email, password }).map((resp) => {
            let data_resp = resp;
            console.log(data_resp);

            if (data_resp["error"]) {
                this.alertCtrl
                    .create({
                        title: "Error al Iniciar",
                        subTitle: data_resp["message"],
                        buttons: ["Ok"],
                    })
                    .present();
            } else {
                this.token = data_resp["token"];
                this.User = JSON.stringify(data_resp["usuario"]);
                //this.User = data_resp["usuario"];
                this.alertCtrl
                    .create({
                        title: data_resp["message"],
                        subTitle: "No olvides cerrar sesión al finalizar.",
                        buttons: ["Ok"],
                    })
                    .present();
                // Guardar en el Storage.
                this.guardar_storage();
            }
        });
    }

    register(nombre: string, email: string, password: string) {
        let url = URL_SERVICIOS + "/register";

        return this.http.post(url, { nombre, email, password }).map((resp) => {
            let data_resp = resp;
            console.log(data_resp);

            if (data_resp["error"]) {
                this.alertCtrl
                    .create({
                        title: "Error al crear Usuario",
                        subTitle: data_resp["message"],
                        buttons: ["Ok"],
                    })
                    .present();
            } else {
                this.alertCtrl
                    .create({
                        title: data_resp["respuesta"],
                        subTitle:
                            "Favor de iniciar sesión con tus datos registrados.",
                        buttons: ["Ok"],
                    })
                    .present();
            }
        });
    }

    cerrar_sesion() {
        this.token = null;
        this.guardar_storage();
    }

    private guardar_storage() {
        if (this.platform.is("cordova")) {
            // Device
            this.storage.set("token", this.token);
            this.storage.set("usuario", this.User);
        } else {
            // Desktop
            if (this.token) {
                localStorage.setItem("token", this.token);
                localStorage.setItem("usuario", this.User);
            } else {
                localStorage.removeItem("token");
                localStorage.removeItem("usuario");
            }
        }
    }

    cargar_storage() {
        let promesa = new Promise((resolve, reject) => {
            if (this.platform.is("cordova")) {
                // Device
                this.storage.ready().then(() => {
                    this.storage.get("token").then((token) => {
                        if (token) {
                            this.token = token;
                        }
                    });

                    this.storage.get("usuario").then((usuario) => {
                        if (usuario) {
                            this.User = usuario;
                        }
                        resolve();
                    });
                    
                });
            } else {
                // Desktop
                if (localStorage.getItem("token")) {
                    this.token = localStorage.getItem("token");
                    this.User = localStorage.getItem("usuario");
                }
                resolve();
            }
        });
        return promesa;
    }

    updateProfile(user:any) {

        console.log(user);
        let nombre = user.nombre;
        let direccion = user.direccion;
        let cuidad = user.cuidad;
        let telefono = user.telefono;
        let dni = user.dni;
        let img_perfil = user.img_perfil;
        let email = user.email;
        let password = user.password;

        let url = URL_SERVICIOS + `/actualizar_perfil/${user.id}/${this.token}`;

        return this.http.post(url, { nombre,direccion,cuidad,telefono,dni,img_perfil,email,password }).map((resp) => {
            let data_resp = resp;
            console.log(data_resp);

            if (data_resp["error"]) {
                this.alertCtrl
                    .create({
                        title: "Error al actualizar datos",
                        subTitle: data_resp["message"],
                        buttons: ["Ok"],
                    })
                    .present();
            } else {
                this.alertCtrl
                    .create({
                        title: "Datos del perfil actualizados correctamente",
                        subTitle: "Inicia sesión de nuevo para cargar tus nuevos datos",
                        buttons: ["Ok"],
                    }).present();
            }
        });
    }
}
