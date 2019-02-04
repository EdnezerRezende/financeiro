import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpRestServiceProvider } from '../http-rest-service/http-rest-service';
import { Saida } from '../../modelos/saida';


@Injectable()
export class ReferenciaServiceProvider {

  private _url:string = this._httpRest.getUrl();
  private _headers:HttpHeaders;

  constructor(public _http: HttpClient, private _httpRest: HttpRestServiceProvider) {
    this._url = this._httpRest.getUrl();
    this._headers = this._httpRest.getHeaders();
  }
  
  obterReferencias(idConta:number){
    return this._http.get(this._url + `listaReferencias/${idConta}` , {headers: this._headers});
  }

}
