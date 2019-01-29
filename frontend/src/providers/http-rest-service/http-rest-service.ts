import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import {Storage} from "@ionic/storage";
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';
import { AuthProvider } from '../auth/auth';
import { JwtHelperService } from '@auth0/angular-jwt';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class HttpRestServiceProvider {

  // private _url = 'http://192.168.1.248:8080/api/';
  private _url = 'http://localhost:8080/';
  // private _url = 'https://gestaolaboratorio.herokuapp.com/api/';


  public log:any;

  autorizacao ; 

  private _headers ;

//   private _headers = new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8'
//   ,'Access-Control-Allow-Origin': '*'
//   // ,'Authorization': 'Bearer ' + this._authProvider.authUser.subscribe(jwt => jwt)
//   ,'Authorization': 'Bearer ' + localStorage.getItem('jwt_token')
//   // ,'Authorization': 'Bearer ' + this.autorizacao
//   // ,'Authorization': 'Bearer ' + Observable.fromPromise(this._storage.get('jwt_token')) 
// });  

  constructor(private _storage: Storage) {
    // this._headers.append('Authorization', 'Bearer '+ localStorage.getItem('jwt_token'));
    this.criarHeaderAutorizacao(localStorage.getItem('jwt_token'));
    this.autorizacao = localStorage.getItem('jwt_token');
  }

  criarHeaderAutorizacao(jwt:string){
    this._headers = new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8'
    ,'Access-Control-Allow-Origin': '*'
    ,'Authorization': 'Bearer ' + jwt
    });  
    // this._headers.append('Authorization', 'Bearer '+ jwt);
  }
  
  ionViewWillLeave(){
    
    // this.autorizacao = this.jwtHelper.tokenGetter() ;  
  }


  public get(key: string) {
    return localStorage.getItem(key);
  }
  async recuperarItem() {
    var object = await this._storage.get('jwt_token');
  }

  getUrl(){
    return this._url;
  }

  getHeaders(){
    return this._headers;
  }

  public handleAngularJsonBug (error: HttpErrorResponse) {
		const JsonParseError = 'Http failure during parsing for';
		const matches = error.message.match(new RegExp(JsonParseError, 'ig'));

		if (error.status === 200 && matches.length === 1) {
      // return obs that completes;
			return Observable;
		} else {
			this.log.debug('re-throwing ');
			return Observable.throw(error);	
		}
	}

}
