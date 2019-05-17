import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FaturasPage } from './faturas';

@NgModule({
  declarations: [
    FaturasPage,
  ],
  imports: [
    IonicPageModule.forChild(FaturasPage),
  ],
  providers:[
    FaturasPage
  ]
})
export class FaturasPageModule {}
