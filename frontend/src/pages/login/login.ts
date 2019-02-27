import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import {finalize} from 'rxjs/operators';
import { AuthProvider } from '../../providers/auth/auth';
import { Usuario } from '../../modelos/usuario';
import { UsuariosServiceProvider } from '../../providers/usuarios-service/usuarios-service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  username:string = '';
  senha: 7867;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private  _loadingCtrl: LoadingController,
    private _toastCtrl: ToastController,
    private _usuariosService: UsuariosServiceProvider,
    private _authProvider: AuthProvider) {
  }

  login(value: any) {
    let loading = this._loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Validando...'
    });

    loading.present();
    let usuario = new Usuario();
    usuario.email = value.username;
    usuario.senha = value.password;
    this._authProvider
      .login(usuario)
      .pipe(finalize(() => loading.dismiss()))
      .subscribe(
        () => {
          
        },
        err => this.handleError(err));
  }

  handleError(error: any) {
    let message: string;
    console.log(error);
    if (error.status && error.status === 400) {
      message = error.error;
    }
    else {
      message = `error ` + error.error;
    }

    const toast = this._toastCtrl.create({
      message,
      duration: 5000,
      position: 'bottom'
    });

    toast.present();
  }

}
