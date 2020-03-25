import { Component } from '@angular/core';
import {
    IonicPage,
    NavController,
    NavParams,
    LoadingController,
    AlertController
} from "ionic-angular";
import { ApiUsersProvider } from '../../providers/api-users/api-users';


@IonicPage()
@Component({
	selector: "page-register",
	templateUrl: "register.html"
})
export class RegisterPage {
	nombre: string;
	email: string;
	password: string;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public loadingCtrl: LoadingController,
		public _us: ApiUsersProvider,
		public alertCtrl: AlertController
	) {}

	ionViewDidLoad() {
		console.log("ionViewDidLoad RegisterPage");
	}

	registrar() {
		let loading = this.loadingCtrl.create({
			content: "Estableciendo conexión con el servidor.."
		});

		loading.present();

		this._us
			.register(this.nombre, this.email, this.password)
			.subscribe(data => {
				console.log(data);
				loading.dismiss();
				this.navCtrl.pop();
			});
	}

	cancelar() {
		this.navCtrl.pop();
	}
}
