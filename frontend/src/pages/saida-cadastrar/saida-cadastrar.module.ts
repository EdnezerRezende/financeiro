import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SaidaCadastrarPage } from './saida-cadastrar';

@NgModule({
  declarations: [
    SaidaCadastrarPage,
  ],
  imports: [
    IonicPageModule.forChild(SaidaCadastrarPage),
  ],
})
export class SaidaCadastrarPageModule {}
