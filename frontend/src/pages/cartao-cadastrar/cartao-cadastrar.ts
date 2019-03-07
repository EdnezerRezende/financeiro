import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartaoDTO } from '../../modelos/cartao.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-cartao-cadastrar',
  templateUrl: 'cartao-cadastrar.html',
})
export class CartaoCadastrarPage {
  
  public cartao: CartaoDTO;
  private formulario: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
    this.cartao = new CartaoDTO();
    this.inicializarFormulario();
  }

  inicializarFormulario(){
    this.formulario = this.formBuilder.group({
      bandeira: ['', Validators.required],
      descricao: ['', Validators.required],
      numeroCartao: ['', Validators.required],
      banco: ['', Validators.required],
      dataVencimento: ['', Validators.required],
    });
  }

  ionViewDidLoad() {
    
    
  }

  salvarCartao(){
    console.log("Salvando cartao");
  }

  compareFn(e1, e2): boolean {
    return e1 === e2;
  }

}
