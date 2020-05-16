import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidosProvider } from '../../providers/pedidos/pedidos';


@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {

    carrito:any[] = [];
    total:any = 0;

    cuidad:string = '';
    calle:string = '';
    colonia:string = '';
    telefono:string = '';
    referencia = '';

    constructor(public navCtrl: NavController, public navParams: NavParams, private _ps: PedidosProvider) {
      this.carrito = this.navParams.get('carrito');
      this.total = this.navParams.get('total');
  }

  ionViewDidLoad() {
    console.log('carrito enviado: ', this.carrito);
    console.log('Total enviado: ', this.total);
  }

    enviar_pedido(){
        this.referencia = 'Sin referencias';
        
        console.log('carrito',this.carrito);
        console.log('total',this.total);
        console.log('cuidad:',this.cuidad);
        console.log('calle:',this.calle);
        console.log('colonia:', this.colonia);
        console.log('referencia:', this.referencia);
        console.log('telefono:', this.telefono);

        this._ps.crear_pedido(this.carrito, this.total,this.cuidad,this.calle,this.colonia,this.referencia,this.telefono).subscribe(() => {
            this.carrito = [];
            this.total = 0;
            this.navCtrl.setRoot('ProductsPage');
        });
    }

}
