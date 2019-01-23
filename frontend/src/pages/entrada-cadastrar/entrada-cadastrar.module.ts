import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EntradaCadastrarPage } from './entrada-cadastrar';

@NgModule({
  declarations: [
    EntradaCadastrarPage,
  ],
  imports: [
    IonicPageModule.forChild(EntradaCadastrarPage),
  ],
})
export class EntradaCadastrarPageModule {}
