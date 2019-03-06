import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { SaidaServiceProvider } from '../../providers/saida-service/saida-service';
import { Saida } from '../../modelos/saida';
import { Conta } from '../../modelos/conta';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public listaSaidas: Saida[] = new Array<Saida>();

  constructor(public navCtrl: NavController, private saidaService: SaidaServiceProvider, 
    private _loadingCtrl: LoadingController, private _alertCtrl: AlertController, 
    private formBuilder: FormBuilder) {

  }

  ionViewWillEnter(){
    let loading = this.obterLoading();
    loading.present();

    let conta:Conta = JSON.parse(localStorage.getItem('conta'));
    this.verificarContasAVencer(conta, loading);
  }

  private verificarContasAVencer(conta: Conta, loading) {
    this.saidaService.obterContasAVencer(conta.idConta).subscribe((saidas: Saida[]) => {
      loading.dismiss();
      this.listaSaidas = saidas;
    }, (err) => {
      loading.dismiss();
      this._alertCtrl.create({
        title: 'Falha ao Obter registros',
        subTitle: 'Erro',
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
