import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SaidaCadastrarPage } from './saida-cadastrar';
import { BrMaskerModule } from 'brmasker-ionic-3';

@NgModule({
  declarations: [
    SaidaCadastrarPage,
  ],
  imports: [
    IonicPageModule.forChild(SaidaCadastrarPage),
    BrMaskerModule
  ],
  providers: [
    SaidaCadastrarPage
  ]
})
export class SaidaCadastrarPageModule {}
