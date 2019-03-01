import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpRestServiceProvider } from '../http-rest-service/http-rest-service';
import { Saida } from '../../modelos/saida';


@Injectable()
export class SaidaServiceProvider {

  private _url:string = this._httpRest.getUrl();
  private _headers:HttpHeaders;

  constructor(public _http: HttpClient, private _httpRest: HttpRestServiceProvider) {
    this._url = this._httpRest.getUrl();
    this._headers = this._httpRest.getHeaders();
  }
  
  obterSaidas(idConta:number){
    return this._http.get(this._url + `listaSaidas/conta/${idConta}` , {headers: this._headers});
  }

  obterSaidasPorReferencia(idConta:number, referencia:string){
    return this._http.get(this._url + `listaSaidas/conta/${idConta}/referencia/${referencia}` , {headers: this._headers});
  }

  salvarSaida(saidas: Saida[]){
    let idConta = 1;
    return this._http.post(this._url + `salvarSaidas/${idConta}` , 
                            saidas, {headers: this._headers});
  }


  excluirSaida(idEntrada: number){
    return this._http.delete(this._url + `excluirSaida/${idEntrada}` ,  {headers: this._headers});
  }

}
