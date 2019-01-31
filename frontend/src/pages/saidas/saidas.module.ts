import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SaidasPage } from './saidas';

@NgModule({
  declarations: [
    SaidasPage,
  ],
  imports: [
    IonicPageModule.forChild(SaidasPage),
  ],
  providers:[
    SaidasPage
  ]
})
export class SaidasPageModule {}
