import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpRestServiceProvider } from '../http-rest-service/http-rest-service';
import { CartaoDTO } from '../../modelos/cartao.dto';

@Injectable()
export class CartaoServiceProvider {

  private _url:string = this._httpRest.getUrl();
  private _headers:HttpHeaders;
  private _token:string;


  jwtRecebido:string;
  
  constructor(private _http: HttpClient, 
    private _httpRest: HttpRestServiceProvider, 
  ) {
    this._url = this._httpRest.getUrl();
    this._headers = this._httpRest.getHeaders();
    this.jwtRecebido = localStorage.getItem('jwt_token');

  }

  salvaCartao(cartao: CartaoDTO){
    let idConta = 1;
    return this._http.post(this._url + `salvarEAtualizarCartao/conta/${idConta}` , 
    cartao, {headers: this._headers});
  }
  

  obterCartoes(idConta:number){
    return this._http.get(this._url + `listaCartoes/conta/${idConta}` , {headers: this._headers});
  }
  
  obterCartaoPorId(idCartao:number){
    return this._http.get(this._url + `obterCartao/${idCartao}` , {headers: this._headers});
  }

  excluirCartao(idCartao: number){
    return this._http.delete(this._url + `excluirCartao/${idCartao}` ,  {headers: this._headers});
  }
}
