import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Entrada } from '../../modelos/entrada';
import { Conta } from '../../modelos/conta';
import { EntradaServiceProvider } from '../../providers/entrada-service/entrada-service';

@IonicPage()
@Component({
  selector: 'page-entradas',
  templateUrl: 'entradas.html',
})
export class EntradasPage {
  entradas:Entrada[];
  entradasSearch: Entrada[] = new Array<Entrada>();
  totalEntradas: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController, private _entradaService: EntradaServiceProvider) {
      this.obterEntradas();
  }

  obterEntradas(){
    let loading = this.obterLoading();
    loading.present();
    let conta: Conta =  JSON.parse(localStorage.getItem('conta'));
    
    this._entradaService.obterEntradas(conta.idConta)
    .subscribe(
      (entradas:Entrada[]) => {
        loading.dismiss();
        
        this.entradas = entradas;
        
        this.calcularVlrEntradas();

        let conta:Conta = JSON.parse(localStorage.getItem('conta'));
        
        conta.entradas = this.entradas;
        this.entradasSearch = this.entradas;

        localStorage.setItem('conta', JSON.stringify(conta));

      },
    (err) => {
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
      }
    );

    
  }

  private calcularVlrEntradas() {
    this.totalEntradas = 0;
    this.entradas.forEach(element => {
      this.totalEntradas += element.valor;
    });
    this.totalEntradas;
  }

  deletarEntrada(entrada:Entrada){
    let loading = this.obterLoading();
    loading.present();
    this._entradaService.excluirEntrada(entrada.idEntrada)
    .subscribe(
      () => {
        loading.dismiss();

        let entradasTemp: Entrada[] = this.entradas.slice(0);

        let index = entradasTemp.indexOf(entrada);
        entradasTemp.splice(index, 1);
        this.entradas = entradasTemp;

        this.entradasSearch = this.copiaListaEntradas();

        this.calcularVlrEntradas();

        let conta:Conta = JSON.parse(localStorage.getItem('conta'));
        
        conta.entradas = this.entradas;

        localStorage.setItem('conta', JSON.stringify(conta));

        this._alertCtrl.create({
          title: 'Sucesso',
          subTitle: 'Entrada Deletada!',
          buttons: [
            {
              text: 'Ok', 
            }
          ]
        }).present();
      },
    (err) => {
        console.log(err);
        loading.dismiss();
        this._alertCtrl.create({
          title: 'Error',
          subTitle: 'Registro não deletado',//err.error.message,
          buttons: [
            {
              text: 'Ok'
            }
          ]
        }).present();
      }
    );
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
        );
      })
    }
  }

  obterLoading(){
    return this._loadingCtrl.create({
      content: 'Carregando...'
    });
  }
}
