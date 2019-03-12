import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { CartaoDTO } from '../../modelos/cartao.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CartaoServiceProvider } from '../../providers/cartao-service/cartao-service';
import { Conta } from '../../modelos/conta';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-cartao-cadastrar',
  templateUrl: 'cartao-cadastrar.html',
})
export class CartaoCadastrarPage {
  
  public cartao: CartaoDTO;
  private formulario: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,
    public cartaoService: CartaoServiceProvider, private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController) {
    this.cartao = new CartaoDTO();
    this.inicializarFormulario();
  }

  inicializarFormulario(){
    this.formulario = this.formBuilder.group({
      bandeira: ['', Validators.required],
      descricao: ['', Validators.required],
      numeroCartao: ['', Validators.required],
      banco: ['', Validators.required],
      diaVencimento: ['', Validators.required],
    });
  }

  ionViewDidLoad() {
    
    
  }

  obterLoading(){
    return this._loadingCtrl.create({
      content: 'Carregando...'
    });
  }

  salvarCartao(){
    let loading = this.obterLoading();
    loading.present();
    let numero:string = this.cartao.numeroCartao+'';

    if (this.cartao.numeroCartao){

      this.cartao.numeroCartao = Number(numero.replace(/[^\d]+/g,''));
    }

    this.cartaoService.salvaCartao(this.cartao)
    .subscribe(
      () => {
        loading.dismiss();

        let conta:Conta = JSON.parse(localStorage.getItem('conta'));

        localStorage.setItem('conta', JSON.stringify(conta));
       
        this._alertCtrl.create({
          title: 'Sucesso',
          subTitle: 'Cartão inserida! Deseja inserir mais cartões ? ',
          buttons: [
            {
              text: 'Sim', 
              handler: ()=> {
                this.limparCamposFormulario();
              }
            },
            { text: 'Não', 
              handler: ()=>{
                this.navCtrl.setRoot(TabsPage);
              } 
            }
          ]
        }).present();
      },
    (err) => {
        console.log(err);
        loading.dismiss();
        this.cartao.numeroCartao = Number(numero);
        this._alertCtrl.create({
          title: 'Falha de cadastro',
          subTitle: 'Erro' + err.error? err.error:'',
          buttons: [
            {
              text: 'Ok'
            }
          ]
        }).present();
      }
    );
  }

  
  limparCamposFormulario(){
    this.inicializarFormulario();
  }
  
  compareFn(e1, e2): boolean {
    return e1 === e2;
  }

}
