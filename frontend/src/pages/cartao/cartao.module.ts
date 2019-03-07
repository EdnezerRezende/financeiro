import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CartaoPage } from './cartao';

@NgModule({
  declarations: [
    CartaoPage,
  ],
  imports: [
    IonicPageModule.forChild(CartaoPage),
  ],
  providers:[CartaoPage]
})
export class CartaoPageModule {}
