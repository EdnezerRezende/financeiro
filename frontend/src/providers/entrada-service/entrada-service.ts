import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../../modelos/usuario';
import { HttpRestServiceProvider } from '../http-rest-service/http-rest-service';
import {Storage} from "@ionic/storage";
import { ReplaySubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Conta } from '../../modelos/conta';
import { Entrada } from '../../modelos/entrada';

const CHAVE = 'avatar-usuario';
@Injectable()
export class EntradaServiceProvider {
  private _url:string = this._httpRest.getUrl();
  private _headers:HttpHeaders;
  private _token:string;


  jwtRecebido:string;
  
  constructor(private _http: HttpClient, 
    private _httpRest: HttpRestServiceProvider, 
    private _storage: Storage, 
    private _jwtHelper: JwtHelperService
  ) {
    this._url = this._httpRest.getUrl();
    this._headers = this._httpRest.getHeaders();
    this.jwtRecebido = localStorage.getItem('jwt_token');

  }

 
  salvarEntrada(entradas: Entrada[]){
    // let conta: Conta = JSON.parse(localStorage.getItem('conta'));
    let idConta = 1;
    console.log(entradas);
    console.log(this.jwtRecebido);
    return this._http.post(this._url + `salvarEntradas/${idConta}` , 
                            entradas, {headers: {'Authorization': 'Bearer ' + this.jwtRecebido, 'Content-Type': 
                                                'application/json;charset=UTF-8', 'Access-Control-Allow-Origin': '*'}
    });
  }
}
