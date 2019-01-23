import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Entrada } from '../../modelos/entrada';
import { Conta } from '../../modelos/conta';

@IonicPage()
@Component({
  selector: 'page-entradas',
  templateUrl: 'entradas.html',
})
export class EntradasPage {
  entradas:Entrada[];
  entradasSearch: Entrada[];
  totalEntradas: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController) {
      this.obterEntradas();
  }

  obterEntradas(){
    let loading = this.obterLoading();
    loading.present();
    let conta: Conta =  JSON.parse(localStorage.getItem('conta'));
    this.entradas = conta.entradas;
    this.entradas.forEach(element => {
      this.totalEntradas += element.valor;
    });
    this.totalEntradas
    loading.dismiss();
  }

  deletarEntrada(entrada:Entrada){
    console.log(entrada);
  }

  copiaListaEntradas(){
    return this.entradas;
  }

  getItems(ev: any) {
    this.entradasSearch = this.copiaListaEntradas();
    const val = ev.target.value;

    if (val && val.trim() != '') {
      this.entradasSearch = this.entradasSearch.filter((item) => {
        return (item.nomeEntrada.toLowerCase().indexOf(val.toLowerCase()) > -1 
        || item.dataEntrada.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  obterLoading(){
    return this._loadingCtrl.create({
      content: 'Carregando...'
    });
  }
}
