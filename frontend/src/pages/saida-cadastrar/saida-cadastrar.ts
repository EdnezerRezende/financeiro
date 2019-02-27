import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { Saida } from '../../modelos/saida';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SaidaServiceProvider } from '../../providers/saida-service/saida-service';
import { Conta } from '../../modelos/conta';
import { TabsPage } from '../tabs/tabs';
import { OrigensDebitos } from '../../modelos/origens-debitos-enum';

@IonicPage()
@Component({
  selector: 'page-saida-cadastrar',
  templateUrl: 'saida-cadastrar.html',
})
export class SaidaCadastrarPage {
  saida: Saida = new Saida();
  private formulario: FormGroup;
  private origens = OrigensDebitos;
  private origensConvertido;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController, private formBuilder: FormBuilder,
    private _saidaService: SaidaServiceProvider, private _toastCtrl: ToastController) {
      this.saida.ehParcelado = false;
      this.saida.isCredito = false;
      this.saida.qtdParcelas = 0;
      this.inicializarFormulario();
      this.origensConvertido = Object.keys(this.origens);

  }

  obterLoading(){
    return this._loadingCtrl.create({
      content: 'Carregando...'
    });
  }

  salvarSaida(){
    let loading = this.obterLoading();
    loading.present();
    this.saida.isDeletado = false;
    let valor:string = this.saida.valor;
    this.saida.valor = valor.replace('.', '').replace(',','.');
    this.saida.valor = Number(this.saida.valor);
    let saidas: Saida[] = new Array<Saida>();
    saidas.push(this.saida);

    this._saidaService.salvarSaida(saidas)
    .subscribe(
      () => {
        loading.dismiss();

        let conta:Conta = JSON.parse(localStorage.getItem('conta'));

        conta.saidas.forEach(saidaConta => {
          saidas.push(saidaConta);
        });
        conta.saidas = saidas;
        localStorage.setItem('conta', JSON.stringify(conta));

        this._alertCtrl.create({
          title: 'Sucesso',
          subTitle: 'Saída inserida! Deseja inserir mais Saídas ? ',
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
        this._alertCtrl.create({
          title: 'Falha de cadastro',
          subTitle: 'Erro',//err.error.message,
          buttons: [
            {
              text: 'Ok'
            }
          ]
        }).present();
      }
    );

  }

  habilitarCampo(){
    return this.saida.ehParcelado;
  }
  inicializarFormulario(){
    this.formulario = this.formBuilder.group({
      nomeSaida: ['', Validators.required],
      descricao: ['', ],
      fonte: ['', Validators.required],
      valor: ['', Validators.required],
      origem: ['', Validators.required],
      dataSaida: ['', Validators.required],
      qtdParcelas: [''],
      ehParcelado: [''],
      isCredito: [''],
    });
  }

  limparCamposFormulario(){
    this.inicializarFormulario();
  }
  
  compareFn(e1, e2): boolean {
    return e1 === e2;
  }
}
