import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController } from 'ionic-angular';

@IonicPage()
@Component({
	selector: "page-nosotros",
	templateUrl: "nosotros.html",
})

export class NosotrosPage {
	constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController) {}

	ionViewDidLoad() {
		console.log("ionViewDidLoad NosotrosPage");
	}

	abrirmenu(){
    this.menuCtrl.toggle();
  }
}
