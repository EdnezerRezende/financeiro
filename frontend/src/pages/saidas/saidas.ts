import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Saida } from '../../modelos/saida';
import { SaidaServiceProvider } from '../../providers/saida-service/saida-service';
import { Conta } from '../../modelos/conta';
import { ReferenciaServiceProvider } from '../../providers/referencia-service/referencia-service';
import { Referencia } from '../../modelos/referencia';
import * as moment from 'moment';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-saidas',
  templateUrl: 'saidas.html',
})
export class SaidasPage {
  saidas:Saida[];
  saidasSearch: Saida[] = new Array<Saida>();
  totalSaidas: number = 0;
  referenciaSelecionado: String;
  referencias: Referencia[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController, private _saidaService: SaidaServiceProvider,
    private _referenciaService: ReferenciaServiceProvider) {
      this.obterReferencias();

      this.obterSaidas();
  }

  obterReferencias(){
    let loading = this.obterLoading();
    loading.present();
    let conta: Conta =  JSON.parse(localStorage.getItem('conta'));
    
    this._referenciaService.obterReferencias(conta.idConta)
    .subscribe((referencias: Referencia[]) => {
      loading.dismiss();
      this.referencias = referencias.sort( (n1,n2) => {
        if (n1.referencia > n2.referencia) {
            return 1;
        }
        if (n1.referencia < n2.referencia) {
            return -1;
        }
        return 0;
      })

      this.referencias = referencias.sort( (n1,n2) => {
        let ano1 = n1.referencia.substring(3,8);
        let ano2 = n2.referencia.substring(3,8);
        if (ano1 > ano2) {
          return 1;
        }
        if (ano1 < ano2) {
            return -1;
        }
        return 0;
      })
    },
    (err) => {
      loading.dismiss();
      this._alertCtrl.create({
        title: 'Error',
        subTitle: 'Não foi possível obter referencias',
        buttons: [
          {
            text: 'Ok'
          }
        ]
      }).present();
    })
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
        let conta:Conta = JSON.parse(localStorage.getItem('conta'));

        conta.saidas = this.saidas;
        this.saidasSearch = this.copiaListaSaidas();
        this.calcularVlrSaidas();
        
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

  
  deletarSaida(saida:Saida){
    let loading = this.obterLoading();
    loading.present();

    this._alertCtrl.create({
      title: 'Alerta',
      subTitle: 'Deseja realmente deletar o registro " ' + saida.nomeSaida +' " ? ',
      buttons: [
        {
          text: 'Sim', 
          handler: ()=> {
            this.efetivarDelecaoRegistro(saida, loading);
          }
        },
        { text: 'Não', 
          handler: ()=>{
            loading.dismiss();
          } 
        }
      ]
    }).present();
  }


  private efetivarDelecaoRegistro(saida: Saida, loading) {
    this._saidaService.excluirSaida(saida.idSaida)
      .subscribe(() => {
        loading.dismiss();
        let saidasTemp: Saida[] = this.saidas.slice(0);
        let index = saidasTemp.indexOf(saida);
        saidasTemp.splice(index, 1);
        this.saidas = saidasTemp;
        this.saidasSearch = this.copiaListaSaidas();
        this.calcularVlrSaidas();
        let conta: Conta = JSON.parse(localStorage.getItem('conta'));
        conta.saidas = this.saidas;
        localStorage.setItem('conta', JSON.stringify(conta));
        this._alertCtrl.create({
          title: 'Sucesso',
          subTitle: 'Saída Deletada!',
          buttons: [
            {
              text: 'Ok',
            }
          ]
        }).present();
      }, (err) => {
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
      });
  }

  private calcularVlrSaidas() {
    this.totalSaidas = 0;
    this.saidasSearch.forEach(element => {
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
      this.calcularVlrSaidas();
    }
  }

  selecionarReferencia(referencia:any){
    if (referencia != undefined && referencia != 'Todas'){
      let saidasTemp: Saida[] = new Array<Saida>();
      this.saidas.forEach(element => {
        let dataRefe = moment(element.dataSaida).subtract(1,'months').format('MM/YYYY');
        // if (moment(referencia.referencia).isSame(dataRefe)){
        if (referencia.referencia  === dataRefe){
          saidasTemp.push(element);
        }
      });
      this.saidasSearch = saidasTemp;
      this.calcularVlrSaidas();      

    } else{
      this.saidasSearch = this.saidas;
      this.calcularVlrSaidas();   
    }
  }

  obterLoading(){
    return this._loadingCtrl.create({
      content: 'Carregando...'
    });
  }
 
  compareRefencia(e1, e2) {
    // this.selecionarReferencia(e1.referencia);
    return e1.referencia === e2.referencia;
    
  }
}
