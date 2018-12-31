import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, App, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { UsuariosServiceProvider } from '../providers/usuarios-service/usuarios-service';
import { AuthProvider } from '../providers/auth/auth';
import { LoginPage } from '../pages/login/login';

@Component({
  selector: 'myapp',
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) public nav: Nav;
  rootPage:any = null;
  showLevel1 = null;


  mostraCadUsuario: boolean;

  public paginas = [
    {titulo: "Entradas", icone: 'ios-add-circle-outline', mostra: this.mostraCadUsuario}

  ];

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public menu: MenuController, app: App,
    private _authProvider: AuthProvider,
    private _usuariosService: UsuariosServiceProvider,) {
    
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.mostraCadUsuario = this.usuarioLogado.cpf === '78671043134';
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this._authProvider.authUser.subscribe(jwt => {
      if (jwt) {
        this.rootPage = TabsPage;
      }
      else {
        this.rootPage = LoginPage.name;
      }
    });

    this._authProvider.checkLogin();
  }


  openPage(page){
    console.log(page);
    this.menu.open();
  }



  logoff(){
    this._usuariosService.setMenuLateralLogoff();
    localStorage.removeItem('jwt_token');
    this._authProvider.logout();
   
    window.location.reload();
   
  }
 irPagina(componente){
   
   this.nav.push(componente);
 }
 
 get avatar() {
   return this._usuariosService.obtemAvatar();
 }

 get usuarioLogado() {
   return this._usuariosService.obtemUsuarioLogado();
 }

 get mostraMenuLateral(){
   return this._usuariosService.obterMenuLateral();
 }

 toggleLevel1(idx) {
   if (this.isLevel1Shown(idx)) {
     this.showLevel1 = null;
   } else {
     this.showLevel1 = idx;
   }
 };

 isLevel1Shown(idx) {
   return this.showLevel1 === idx;
 };
}
