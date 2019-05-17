import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpRestServiceProvider } from '../http-rest-service/http-rest-service';

@Injectable()
export class FaturaServiceProvider {

  private _url:string = this._httpRest.getUrl();
  private _headers:HttpHeaders;
  private _token:string;

  jwtRecebido:string;

  constructor(private _http: HttpClient, 
    private _httpRest: HttpRestServiceProvider) {
    this._url = this._httpRest.getUrl();
    this._headers = this._httpRest.getHeaders();
    this.jwtRecebido = localStorage.getItem('jwt_token');

  }

  obterFaturasCartao(idCartao:number){
    return this._http.get(this._url + `listaFaturaCartoes/${idCartao}` , {headers: this._headers});
  }
}
