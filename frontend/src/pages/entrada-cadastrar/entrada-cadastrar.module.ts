import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EntradaCadastrarPage } from './entrada-cadastrar';
import { BrMaskerModule } from 'brmasker-ionic-3';

@NgModule({
  declarations: [
    EntradaCadastrarPage,
  ],
  imports: [
    IonicPageModule.forChild(EntradaCadastrarPage),
    BrMaskerModule
  ],
  providers:[
    EntradaCadastrarPage
  ]
})
export class EntradaCadastrarPageModule {}
