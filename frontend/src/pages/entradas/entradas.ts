import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Entrada } from '../../modelos/entrada';
import { Conta } from '../../modelos/conta';
import { EntradaServiceProvider } from '../../providers/entrada-service/entrada-service';
import { Referencia } from '../../modelos/referencia';
import { ReferenciaServiceProvider } from '../../providers/referencia-service/referencia-service';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-entradas',
  templateUrl: 'entradas.html',
})
export class EntradasPage {
  entradas:Entrada[];
  entradasSearch: Entrada[] = new Array<Entrada>();
  totalEntradas: number = 0;
  referenciaSelecionado: String;
  referencias: Referencia[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController, private _entradaService: EntradaServiceProvider,
    private _referenciaService: ReferenciaServiceProvider) {
      this.obterReferencias();
      this.obterEntradas();
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

    this._alertCtrl.create({
      title: 'Alerta',
      subTitle: 'Deseja realmente deletar o registro " ' + entrada.nomeEntrada +' " ? ',
      buttons: [
        {
          text: 'Sim', 
          handler: ()=> {
            this.deletarRegistro(entrada, loading);
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

  private deletarRegistro(entrada: Entrada, loading) {
    this._entradaService.excluirEntrada(entrada.idEntrada)
      .subscribe(() => {
        loading.dismiss();
        let entradasTemp: Entrada[] = this.entradas.slice(0);
        let index = entradasTemp.indexOf(entrada);
        entradasTemp.splice(index, 1);
        this.entradas = entradasTemp;
        this.entradasSearch = this.copiaListaEntradas();
        this.calcularVlrEntradas();
        let conta: Conta = JSON.parse(localStorage.getItem('conta'));
        conta.entradas = this.entradas;
        localStorage.setItem('conta', JSON.stringify(conta));
        this.obterReferencias();
        this._alertCtrl.create({
          title: 'Sucesso',
          subTitle: 'Entrada Deletada!',
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
      this.calcularVlrEntradas();
    }
  }

  selecionarReferencia(referencia:any){
    if (referencia != undefined && referencia != 'Todas'){
      let entradasTemp: Entrada[] = new Array<Entrada>();
      this.entradas.forEach(element => {
        let dataRefe = moment(element.dataEntrada).subtract(1,'months').format('MM/YYYY');
        // if (moment(referencia.referencia).isSame(dataRefe)){
        if (referencia.referencia  === dataRefe){
          entradasTemp.push(element);
        }
      });
      this.entradasSearch = entradasTemp;
      this.calcularVlrEntradas();      

    } else{
      this.entradasSearch = this.entradas;
      this.calcularVlrEntradas();   
    }
  }

  obterLoading(){
    return this._loadingCtrl.create({
      content: 'Carregando...'
    });
  }

  compareRefencia(e1, e2) {
    return e1.referencia === e2.referencia;
    
  }
}
