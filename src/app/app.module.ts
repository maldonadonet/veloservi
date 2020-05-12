import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HttpClientModule } from "@angular/common/http";

import { IonicStorageModule } from "@ionic/storage";

// Providers
import { ApiUsersProvider } from '../providers/api-users/api-users';
import { ApiProductsProvider } from '../providers/api-products/api-products';
import { PedidosProvider } from '../providers/pedidos/pedidos';

// List Plugins
import { Network } from "@ionic-native/network";

// Firebase
import { FIREBASE_CONFIG } from './app.firebase.config';

import { AngularFireModule } from "angularfire2";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { FirestoreProvider } from '../providers/firestore/firestore';

@NgModule({
	declarations: [MyApp],
	imports: [
		BrowserModule,
		IonicModule.forRoot(MyApp),
		HttpClientModule,
		IonicStorageModule.forRoot(),
		AngularFireModule.initializeApp(FIREBASE_CONFIG),
    	AngularFireAuthModule,
    	AngularFirestoreModule,
	],
	bootstrap: [IonicApp],
	entryComponents: [MyApp],
	providers: [
		StatusBar,
		SplashScreen,
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
		ApiUsersProvider,
		ApiProductsProvider,
		PedidosProvider,
		Network,
		FirestoreProvider
	],
})
export class AppModule {}
