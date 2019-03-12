import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';


import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import 'rxjs/operators/catchError';
import 'rxjs/operators/retry';

import {Storage, IonicStorageModule} from "@ionic/storage";
import { BrMaskerModule } from 'brmasker-ionic-3';
import { OrderModule } from 'ngx-order-pipe';
import { AuthProvider } from '../providers/auth/auth';
import { HttpClientModule } from '@angular/common/http';
import { HttpRestServiceProvider } from '../providers/http-rest-service/http-rest-service';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { TokenStorage } from '../providers/http-rest-service/TokenStorage';
import { UsuariosServiceProvider } from '../providers/usuarios-service/usuarios-service';
import { EntradaServiceProvider } from '../providers/entrada-service/entrada-service';
import { SaidaServiceProvider } from '../providers/saida-service/saida-service';
import { ChartsModule } from 'ng2-charts';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { SharedDirectivesModule } from '../diretivas/shared-directives.module';
import { ReferenciaServiceProvider } from '../providers/referencia-service/referencia-service';
import { CartaoServiceProvider } from '../providers/cartao-service/cartao-service';

export function jwtOptionsFactory(storage: Storage) {
  return {
    tokenGetter: () => {return localStorage.getItem('jwt_token');},
    whitelistedDomains: ['localhost:8080']
  }
}

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: 'Voltar',
      // iconMode: 'ios',
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      tabsPlacement: 'bottom',
      pageTransition: 'md-transition  ',
      menuType: 'overlay'
    }),
    // IonicStorageModule.forRoot(),
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: ['sqlite', 'websql', 'indexeddb']
    }),
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [Storage]
      }
    }),
    HttpClientModule, 
    BrMaskerModule,
    OrderModule,
    ChartsModule,
    CurrencyMaskModule,
    SharedDirectivesModule
  ],
  exports:[
    BrMaskerModule,
    OrderModule,
    ChartsModule,
    CurrencyMaskModule,
    SharedDirectivesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    HttpRestServiceProvider,
    TokenStorage,
    UsuariosServiceProvider,
    EntradaServiceProvider,
    SaidaServiceProvider,
    ReferenciaServiceProvider,
    CartaoServiceProvider
    
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
