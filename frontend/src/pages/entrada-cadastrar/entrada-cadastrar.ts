import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { Entrada } from '../../modelos/entrada';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EntradaServiceProvider } from '../../providers/entrada-service/entrada-service';
import { finalize } from 'rxjs/operators';
import { Conta } from '../../modelos/conta';
import { TabsPage } from '../tabs/tabs';
import { Origens } from '../../modelos/origens-enum';

@IonicPage()
@Component({
  selector: 'page-entrada-cadastrar',
  templateUrl: 'entrada-cadastrar.html',
})
export class EntradaCadastrarPage {
  entrada:Entrada = new Entrada();
  private formulario: FormGroup;
  private origens = Origens;
  private origensConvertido;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController, private formBuilder: FormBuilder,
    private _entradaService: EntradaServiceProvider, private _toastCtrl: ToastController) {
      this.inicializarFormulario();
      this.origensConvertido = Object.keys(this.origens);
  }

  inicializarFormulario(){
    this.formulario = this.formBuilder.group({
      nomeEntrada: ['', Validators.required],
      descricao: ['', ],
      fonte: ['', Validators.required],
      valor: ['', Validators.required],
      origem: ['', Validators.required],
      dataEntrada: ['', Validators.required],
      
    });
  }

  obterLoading(){
    return this._loadingCtrl.create({
      content: 'Carregando...'
    });
  }

  salvarEntrada(){
    let loading = this.obterLoading();
    loading.present();
    this.entrada.isDeletado = false;
    let valor:string = this.entrada.valor;
    this.entrada.valor = valor.replace('.', '').replace(',','.');

    let entradas: Entrada[] = new Array<Entrada>();
    entradas.push(this.entrada);

    this._entradaService.salvarEntrada(entradas)
    .subscribe(
      () => {
        loading.dismiss();

        let conta:Conta = JSON.parse(localStorage.getItem('conta'));

        conta.entradas.forEach(entradaConta => {
          entradas.push(entradaConta);
        });
        conta.entradas = entradas;
        localStorage.setItem('conta', JSON.stringify(conta));

        this._alertCtrl.create({
          title: 'Sucesso',
          subTitle: 'Entrada inserida! Deseja inserir mais Entradas ? ',
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

  limparCamposFormulario(){
    this.inicializarFormulario();
  }
  
  compareFn(e1, e2): boolean {
    return e1 === e2;
  }
}
