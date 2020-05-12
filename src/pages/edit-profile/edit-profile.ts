import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiUsersProvider } from './../../providers/api-users/api-users';



@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  user:any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, private _us: ApiUsersProvider) {
    this.user = this.navParams.get('user');
    console.log('User:',this.user);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

  update(){
    console.log(this.user);
    this._us.updateProfile(this.user).subscribe(()=>{
      this._us.cerrar_sesion();
      this.navCtrl.setRoot("WelcomePage");
    });
  }
}
