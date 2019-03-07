import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CartaoCadastrarPage } from './cartao-cadastrar';
import { BrMaskerModule } from 'brmasker-ionic-3';
import { SharedDirectivesModule } from '../../diretivas/shared-directives.module';

@NgModule({
  declarations: [
    CartaoCadastrarPage,
  ],
  imports: [
    IonicPageModule.forChild(CartaoCadastrarPage),
    BrMaskerModule,
    SharedDirectivesModule
  ],
  providers:[CartaoCadastrarPage]
})
export class CartaoCadastrarPageModule {}
