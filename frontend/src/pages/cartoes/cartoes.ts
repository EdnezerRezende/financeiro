import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { CartaoDTO } from '../../modelos/cartao.dto';
import { Conta } from '../../modelos/conta';
import { CartaoServiceProvider } from '../../providers/cartao-service/cartao-service';
import { FaturaServiceProvider } from '../../providers/fatura-service/fatura-service';
import { FaturaCartaoDTO } from '../../modelos/fatura_cartao.dto';
import { FaturasPage } from '../faturas/faturas';

@IonicPage()
@Component({
  selector: 'page-cartoes',
  templateUrl: 'cartoes.html',
})
export class CartoesPage {

  cartoes:CartaoDTO[];
  cartoesSearch: CartaoDTO[];
  faturas:FaturaCartaoDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController, private _cartaoService:CartaoServiceProvider,
    private _faturaService: FaturaServiceProvider) {
      this.cartoes = new Array<CartaoDTO>();
      this.cartoesSearch = new Array<CartaoDTO>();
      this.obterCartoes();
  }

  obterCartoes(){
    let loading = this.obterLoading();
    loading.present();
    let conta: Conta =  JSON.parse(localStorage.getItem('conta'));
    
    this._cartaoService.obterCartoes(conta.idConta)
    .subscribe(
      (cartoes:CartaoDTO[]) => {
        loading.dismiss();
        
        this.cartoes = cartoes;
        
        this.cartoesSearch = this.cartoes;
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

  deletarCartao(cartao:CartaoDTO){
    let loading = this.obterLoading();
    loading.present();

    this._alertCtrl.create({
      title: 'Alerta',
      subTitle: 'Deseja realmente deletar o cartão de número " ' + cartao.numeroCartao +' " ? ',
      buttons: [
        {
          text: 'Sim', 
          handler: ()=> {
            this.deletarRegistro(cartao, loading);
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

  obterFaturasCartao(cartao:CartaoDTO){
    this.navCtrl.push(FaturasPage.name, {idCartao: cartao.idCartao});
  }

  deletarRegistro(cartao:CartaoDTO, loading){
    let conta: Conta =  JSON.parse(localStorage.getItem('conta'));
    
    this._cartaoService.excluirCartao(cartao.idCartao)
    .subscribe(
      () => {
        loading.dismiss();
        
        let cartoesTemp: CartaoDTO[] = this.cartoes.slice(0);
        let index = cartoesTemp.indexOf(cartao);
        cartoesTemp.splice(index, 1);
        this.cartoes = cartoesTemp;
        this.cartoesSearch = this.copiaListaCartoes();

        this._alertCtrl.create({
          title: 'Sucesso',
          subTitle: 'Cartão Deletado!',
          buttons: [
            {
              text: 'Ok',
            }
          ]
        }).present();
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
  
  getItems(ev: any) {
    this.cartoesSearch = this.copiaListaCartoes();
    const val = ev.target.value;

    if (val && val.trim() != '') {
      this.cartoesSearch = this.cartoesSearch.filter((item) => {
        return (item.bandeira.toLowerCase().indexOf(val.toLowerCase()) > -1 );
      })
    }
  }

  copiaListaCartoes(){
    return this.cartoes;
  }
  obterLoading(){
    return this._loadingCtrl.create({
      content: 'Carregando...'
    });
  }

}
