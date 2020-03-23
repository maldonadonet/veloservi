import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { ApiUsersProvider } from '../providers/api-users/api-users';
import { IonicStorageModule } from "@ionic/storage";
import { ApiProductsProvider } from '../providers/api-products/api-products';

@NgModule({
    declarations: [MyApp],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        HttpClientModule,
        IonicStorageModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [MyApp],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        ApiUsersProvider,
    ApiProductsProvider
    ]
})
export class AppModule {}
