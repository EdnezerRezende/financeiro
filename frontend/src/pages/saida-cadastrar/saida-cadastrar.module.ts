import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SaidaCadastrarPage } from './saida-cadastrar';
import { BrMaskerModule } from 'brmasker-ionic-3';
import { SharedDirectivesModule } from '../../diretivas/shared-directives.module';

@NgModule({
  declarations: [
    SaidaCadastrarPage,
  ],
  imports: [
    IonicPageModule.forChild(SaidaCadastrarPage),
    BrMaskerModule,
    SharedDirectivesModule
  ],
  providers: [
    SaidaCadastrarPage
  ]
})
export class SaidaCadastrarPageModule {}
