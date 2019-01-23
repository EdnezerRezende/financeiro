import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Entrada } from '../../modelos/entrada';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-entrada-cadastrar',
  templateUrl: 'entrada-cadastrar.html',
})
export class EntradaCadastrarPage {
  entrada:Entrada = new Entrada();
  private formulario: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController, private formBuilder: FormBuilder) {

      this.inicializarFormulario();
  }

  inicializarFormulario(){
    this.formulario = this.formBuilder.group({
      nomeEntrada: ['', Validators.required],
      
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
    console.log("Salvando Entrada");
    console.log(this.entrada);
    loading.dismiss();
  }
  limparCamposFormulario(){
    this.entrada.nomeEntrada = "";
  }
  
}
