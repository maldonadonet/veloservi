import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WelcomePage } from './welcome';
import { MenuListModule } from '../../components/menu-list/menu-list.module';



@NgModule({
  declarations: [WelcomePage],
  imports: [IonicPageModule.forChild(WelcomePage), MenuListModule]
})
export class WelcomePageModule {}
