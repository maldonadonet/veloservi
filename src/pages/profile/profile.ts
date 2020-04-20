import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController } from 'ionic-angular';
import { ApiUsersProvider } from './../../providers/api-users/api-users';



@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  user:any = {};

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private menuCtrl: MenuController,
              private _us: ApiUsersProvider) 
  {
    this._us.cargar_storage();
    this.user = JSON.parse(this._us.User);
    console.log(this.user);
  }

  ionViewDidLoad() {
          
	}

  abrirmenu(){
    this.menuCtrl.toggle();
  }

  // watch network for a disconnection
  

}
