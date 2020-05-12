import { Component } from '@angular/core';
import { Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ApiUsersProvider } from '../providers/api-users/api-users';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, 
              statusBar: StatusBar, 
               splashScreen: SplashScreen, 
               private _us: ApiUsersProvider,
               private menuCtrl: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      if(this._us.usuario_activo()){
        this.rootPage = 'ProductsPage';
        statusBar.styleDefault();
        splashScreen.hide();
      }else {
        this.rootPage = "HomePage";
        statusBar.styleDefault();
        splashScreen.hide();
      }

    });
  }

  openPage(page:string) {
    console.log(page);
    this.rootPage = page;
    this.menuCtrl.close();
  }

  salir() {
    this._us.cerrar_sesion();
    this.rootPage = 'HomePage';
    this.menuCtrl.close();
    
  }
}

