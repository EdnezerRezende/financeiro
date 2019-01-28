import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../../modelos/usuario';
import { HttpRestServiceProvider } from '../http-rest-service/http-rest-service';
import {Storage} from "@ionic/storage";
import { ReplaySubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Entrada } from '../../modelos/entrada';

const CHAVE = 'avatar-usuario';
@Injectable()
export class UsuariosServiceProvider {
  private _url:string = this._httpRest.getUrl();
  private _headers:HttpHeaders;
  private _token:string;


  authUser = new ReplaySubject<any>(1);
  
  jwtRecebido:string;
  private _usuarioLogado: Usuario;

  public mostraMenuLateral: boolean = false;
  
  constructor(private _http: HttpClient, 
    private _httpRest: HttpRestServiceProvider, 
    private _storage: Storage, 
    private _jwtHelper: JwtHelperService
  ) {
    this._usuarioLogado = new Usuario();
    this._url = this._httpRest.getUrl();
    this._headers = this._httpRest.getHeaders();
    // this._headers = new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8'
    // ,'Access-Control-Allow-Origin': '*'
    // ,'Authorization': 'Bearer ' + localStorage.getItem('jwt_token')
    // })

  }

  efetuaLogin(email, senha) {
    // this.dadosFicticios();
    return true;
    
  }
  
  obtemUsuarioLogado() {
    return this._usuarioLogado;
  }

  setUsuarioLogado(usuario: Usuario, jwt:string){
    this.jwtRecebido = jwt;
    this._http.post(this._url+'usuario/usuarioLogado', usuario.email,
    // {headers: this._headers
    {headers: {'Authorization': 'Bearer ' + jwt, 'Content-Type': 'application/json;charset=UTF-8', 'Access-Control-Allow-Origin': '*'}
  })
    .subscribe((usuarioR:Usuario)=> {
      this._usuarioLogado = usuarioR; 
      let entradasTemp: Entrada[] = new Array<Entrada>();
      this._usuarioLogado.conta.entradas.forEach(entrada => {
        if (!entrada.isDeletado){
          entradasTemp.push(entrada);
        }
      });
      this._usuarioLogado.conta.entradas = entradasTemp;
      localStorage.setItem('usuario_cpf', this._usuarioLogado.cpf);
      localStorage.setItem('usuario_email', this._usuarioLogado.email);
      localStorage.setItem('usuario', JSON.stringify(this._usuarioLogado));
      localStorage.setItem('conta', JSON.stringify(this._usuarioLogado.conta));

      this.mostraMenuLateral = true;
    });
  }

  obterMenuLateral(){
    return this.mostraMenuLateral;
  }

  setMenuLateralLogoff(){
    this.mostraMenuLateral = false;
    // this._usuarioLogado = new Usuario();
  }
  setUsuarioRecebido(usuario:Usuario){
    this.mostraMenuLateral = true;
    this._usuarioLogado = usuario;
  }

  obtemAvatar() {
    return localStorage.getItem(CHAVE)
            ? localStorage.getItem(CHAVE)
            : 'assets/img/avatar-padrao.jpg';
  }

  salvaAvatar(avatar){
    localStorage.setItem(CHAVE,avatar);
  }

  alterarDadosUsuario(usuario:Usuario){
    return this._http.post(this._url+'alterarSenha', usuario, {headers:this._headers})
  }

  salvarUsuario(usuario:Usuario){
    return this._http.post(this._url + 'usuario/salvar', usuario, {headers: {'Authorization': 'Bearer ' + this.jwtRecebido, 'Content-Type': 'application/json;charset=UTF-8', 'Access-Control-Allow-Origin': '*'}});
  }

}
