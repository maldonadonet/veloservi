import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetallePedidosPage } from './detalle-pedidos';

@NgModule({
  declarations: [
    DetallePedidosPage,
  ],
  imports: [
    IonicPageModule.forChild(DetallePedidosPage),
  ],
})
export class DetallePedidosPageModule {}
