import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
	selector: "page-carrito",
	templateUrl: "carrito.html"
})
export class CarritoPage {
  data: any[] = [];
  total: any = 0;

	constructor(public navCtrl: NavController, public navParams: NavParams) {
		this.data = navParams.get("data");
	}

	ionViewDidLoad() {
    console.log("Data cargada: ", this.data);
    if(this.data){
      this.data.forEach(element => {
        console.log(element);
        this.total = this.total + element.producto.precio * element.cantidad;
      });
    }
    console.log('total:', this.total);
	}

	back(){
    this.navCtrl.pop();
  }
}
