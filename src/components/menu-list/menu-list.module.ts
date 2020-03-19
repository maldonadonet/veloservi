import { NgModule } from '@angular/core';
import { IonicModule } from "ionic-angular";
import { MenuListComponent } from './menu-list';

@NgModule({
    declarations : [
        MenuListComponent
    ],
    imports : [
        IonicModule
    ],
    exports : [
        MenuListComponent
    ]
})
export class MenuListModule {}