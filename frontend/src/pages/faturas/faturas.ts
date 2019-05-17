import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Conta } from '../../modelos/conta';
import { FaturaServiceProvider } from '../../providers/fatura-service/fatura-service';
import { FaturaCartaoDTO } from '../../modelos/fatura_cartao.dto';


@IonicPage()
@Component({
  selector: 'page-faturas',
  templateUrl: 'faturas.html',
})
export class FaturasPage {

  idCartao: number;
  faturas: FaturaCartaoDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private _loadingCtrl: LoadingController, private _faturaCartaoService: FaturaServiceProvider,
    private _alertCtrl: AlertController) {
    this.idCartao = this.navParams.get('idCartao');

    this.obterFaturas();
  }

  private obterFaturas() {
    let loading = this.obterLoading();
    loading.present();
    let conta: Conta = JSON.parse(localStorage.getItem('conta'));
    this._faturaCartaoService.obterFaturasCartao(this.idCartao)
      .subscribe((faturas: FaturaCartaoDTO[]) => {
        loading.dismiss();
        this.faturas = faturas;
      }, (err) => {
        loading.dismiss();
        this._alertCtrl.create({
          title: 'Error',
          subTitle: 'Não foi possível obter registros',
          buttons: [
            {
              text: 'Ok'
            }
          ]
        }).present();
      });
  }

  obterLoading(){
    return this._loadingCtrl.create({
      content: 'Carregando...'
    });
  }
}
