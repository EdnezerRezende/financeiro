import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Saida } from '../../modelos/saida';
import { SaidaServiceProvider } from '../../providers/saida-service/saida-service';
import { Conta } from '../../modelos/conta';

@IonicPage()
@Component({
  selector: 'page-saidas',
  templateUrl: 'saidas.html',
})
export class SaidasPage {
  saidas:Saida[];
  saidasSearch: Saida[] = new Array<Saida>();
  totalSaidas: number = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams, private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController, private _saidaService: SaidaServiceProvider) {
      this.obterSaidas();
  }


  obterSaidas(){
    let loading = this.obterLoading();
    loading.present();
    let conta: Conta =  JSON.parse(localStorage.getItem('conta'));
    
    this._saidaService.obterSaidas(conta.idConta)
    .subscribe(
      (saidas:Saida[]) => {
        loading.dismiss();
        
        this.saidas = saidas;
        
        this.calcularVlrSaidas();

        let conta:Conta = JSON.parse(localStorage.getItem('conta'));
        
        conta.saidas = this.saidas;
        this.saidasSearch = this.saidas;

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

  deletarEntrada(saida:Saida){
    let loading = this.obterLoading();
    loading.present();
    this._saidaService.excluirSaida(saida.idSaida)
    .subscribe(
      () => {
        loading.dismiss();
        let saidasTemp: Saida[] = new Array<Saida>();
        this.saidas.forEach(element => {
          if ( element.idSaida != saida.idSaida){
              saidasTemp.push(element);
          }
        });
        this.saidas = new Array<Saida>();
        this.saidas = saidasTemp;
        
        this.calcularVlrSaidas();

        let conta:Conta = JSON.parse(localStorage.getItem('conta'));
        
        conta.saidas = this.saidas;

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
          subTitle: 'Registro não deletado',
          buttons: [
            {
              text: 'Ok'
            }
          ]
        }).present();
      }
    );
  }


  private calcularVlrSaidas() {
    this.totalSaidas = 0;
    this.saidas.forEach(element => {
      this.totalSaidas += element.valor;
    });
    this.totalSaidas;
  }


  copiaListaSaidas(){
    return this.saidas;
  }

  getItems(ev: any) {
    this.saidasSearch = this.copiaListaSaidas();
    const val = ev.target.value;

    if (val && val.trim() != '') {
      this.saidasSearch = this.saidasSearch.filter((item) => {
        return (item.nomeSaida.toLowerCase().indexOf(val.toLowerCase()) > -1 
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
