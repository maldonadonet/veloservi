import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ApiUsersProvider } from '../providers/api-users/api-users';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private _us: ApiUsersProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      if(this._us.usuario_activo){
        this.rootPage = 'ProductsPage';
      }else {
        this.rootPage = "HomePage";
      }



      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

