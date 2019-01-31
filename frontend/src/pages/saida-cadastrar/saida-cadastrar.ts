import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { Saida } from '../../modelos/saida';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SaidaServiceProvider } from '../../providers/saida-service/saida-service';

@IonicPage()
@Component({
  selector: 'page-saida-cadastrar',
  templateUrl: 'saida-cadastrar.html',
})
export class SaidaCadastrarPage {
  saida: Saida = new Saida();
  private formulario: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController, private formBuilder: FormBuilder,
    private _saidaService: SaidaServiceProvider, private _toastCtrl: ToastController) {
      this.inicializarFormulario();
  }

  salvarSaida(){

  }

  inicializarFormulario(){
    this.formulario = this.formBuilder.group({
      nomeSaida: ['', Validators.required],
      descricao: ['', ],
      fonte: ['', Validators.required],
      valor: ['', Validators.required],
      origem: ['', Validators.required],
      dataSaida: ['', Validators.required],
      qtdParcelas: ['', Validators.required],
      ehParcelado: ['', Validators.required],
    });
  }

  limparCamposFormulario(){
    this.inicializarFormulario();
  }
  
  compareFn(e1, e2): boolean {
    return e1 === e2;
  }
}
