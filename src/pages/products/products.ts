import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, MenuController, Platform, ToastController } from "ionic-angular";
import { Storage } from "@ionic/storage";

// Provider Users
import { ApiUsersProvider } from '../../providers/api-users/api-users';
import { ApiProductsProvider } from '../../providers/api-products/api-products';
import { stringify } from '@angular/core/src/util';



@IonicPage()
@Component({
    selector: "page-products",
    templateUrl: "products.html",
})

export class ProductsPage {
    usuario: any[] = [];
    productos: any[] = [];
    page: number = 1;
    carrito: any[] = [];
    asociados: any[] = [];
    promocion: boolean = false;
    carritostorage:string [] = [];

    productosStore: any[] = [];

    constructor( public navCtrl: NavController, public _us: ApiUsersProvider, public _ps: ApiProductsProvider, public loadingCtrl: LoadingController,public alertCtrl:AlertController, private menuCtrl: MenuController, public navParams: NavParams, private platform: Platform, private storage: Storage, private toastCtrl: ToastController) {
        if (navParams.get('data') == 'vaciar') {
            this.carrito = [];
        }
        
    }

    ionViewDidLoad() {
        let loading = this.loadingCtrl.create({
            content: "Cargando productos...",
        });

        loading.present();

        this._ps.getProducts().subscribe((data: any) => {
            this.productos = data.data.data;
            loading.dismiss();
        });
    }

    salir() {
        this._us.cerrar_sesion();
        this.navCtrl.setRoot("HomePage");
    }

    filtrar_categoria() {
        this.filtrar();
    }

    filtrar() {
        let alert = this.alertCtrl.create();
        alert.setTitle("Filtrar por Categoría");

        alert.addInput({
            type: "radio",
            label: "Farmacia",
            value: "Farmacia",
            checked: false,
        });
        alert.addInput({
            type: "radio",
            label: "Ropa",
            value: "Ropa",
            checked: false,
        });
        alert.addInput({
            type: "radio",
            label: "Tienda",
            value: "Tienda",
            checked: false,
        });
        alert.addInput({
            type: "radio",
            label: "Zapatos",
            value: "Zapatos",
            checked: false,
        });

        alert.addButton("Cancel");
        alert.addButton( { text: "Filtrar", handler: (data) => {
                if (data == undefined) {
                    return;
                } else {
                    this.promocion = false;
                    this._ps.filtrarCategoria(data).subscribe((data: any) => {
                        this.productos = data.data.data;
                    });
                }
            },
        });
        alert.present();
    }

    filtrar_asociado() {
        this.filtrarAsociado();
    }

    filtrarAsociado() {
        let alert = this.alertCtrl.create();
        alert.setTitle("Sucursales");

        let item: any = [];

        this._ps.obtenerAsociados().subscribe((data: any) => {
            this._ps.asociados.forEach((element) => {
                alert.addInput({
                    type: "radio",
                    label: element.name,
                    value: element.id,
                    checked: false,
                });
            });

            alert.addButton("Cancelar");
            alert.addButton({
                text: "Aplicar filtro",
                handler: (data) => {
                    console.log(data);
                    if (data == undefined) {
                        return;
                    } else {
                        this._ps
                            .filtrarAsociado(data)
                            .subscribe((data: any) => {
                                console.log("Asociado_Id: ", data.data.data);
                                this.productos = data.data.data;
                            });
                    }
                },
            });
            alert.present();
        });
    }

    filtrar_promociones() {
        this.filtrarPromociones();
    }

    filtrarPromociones() {
        let alert = this.alertCtrl.create();
        alert.setTitle("Mostrar productos en Promoción");

        alert.addButton("Cancel");
        alert.addButton({
            text: "Filtrar",
            handler: (data) => {
                this._ps.filtrarPromocion().subscribe((data: any) => {
                    console.log("Promociones: ", data.data.data);
                    this.productos = data.data.data;
                    this.promocion = true;
                });
            },
        });
        alert.present();
    }

    // funcion para cargar mas productos al infinited Scroll
    loadData(event) {
        console.log("Cargando productos");
        let newData: string[] = [];

        setTimeout(() => {
            this._ps.nextPage(2).subscribe((data: any) => {
                for (let i = 0; i <= data.data.data.length; i++) {
                    newData.push(data.data.data[i]);
                }

                console.log(newData);

                event.complete();
            });
        }, 1000);
    }

    addCarrito(item) {
        this.abrirModal(item);
    }

    // process agregar al carrito
    abrirModal(item) {
        const prompt = this.alertCtrl.create({
            title: "Agregar al Carrito",
            message: "Confirmación de datos",
            inputs: [
                {
                    name: "cantidad",
                    placeholder: "Cantidad",
                    type: "number",
                    min: 1
                },
            ],
            buttons: [
                {
                    text: "Cancelar",
                    handler: (data) => {
                        console.log("Cancel clicked");
                    },
                },
                {
                    text: "Agregar",
                    handler: (data) => {
                        console.log(data);
                        console.log("Product_id: ", item.id);

                        if(data.cantidad <= 0){
                            console.log('No se introdujo una cantidad valida');
                            this.toastCtrl.create({
                                message: 'Favor de introducir una cantidad valida',
                                duration: 2000
                            }).present();

                            return;
                        }

                        this.carrito.push({
                            producto: item,
                            cantidad: data.cantidad,
                        });

                        this.toastCtrl.create({
                            message: 'Producto agregardo correctamente',
                            duration: 2000
                        }).present();

                        console.log(this.carrito);
                    },
                },
            ],
        });
        prompt.present();
    }

    irCarrito() {
        this.navCtrl.push("CarritoPage", { data: this.carrito });
    }

    navigatePedidoEsp() {
        this.navCtrl.push("PedidoEspecialPage");
    }

    openModal() {
        this.menuCtrl.toggle();
    }

    agregar_carrito_storage(id,cantidad) {


    }

    
}
