import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { MaskCurrencyDirective } from './mask-currency.directive';

@NgModule({
  declarations: [
    MaskCurrencyDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule
  ],
  exports: [
       MaskCurrencyDirective
  ]
})

export class SharedDirectivesModule { }