import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ReplaySubject, Observable} from "rxjs";
import {tap} from 'rxjs/operators';
import {Storage} from "@ionic/storage";
import {JwtHelperService} from "@auth0/angular-jwt";
import { HttpRestServiceProvider } from '../http-rest-service/http-rest-service';
import { UsuariosServiceProvider } from '../usuarios-service/usuarios-service';
import { Usuario } from '../../modelos/usuario';

@Injectable()
export class AuthProvider {
  private jwtTokenName = 'jwt_token';

  private _url:string;

  authUser = new ReplaySubject<any>(1);

  constructor(private _httpClient: HttpClient, private _httpRest:HttpRestServiceProvider,
              private _storage: Storage,
              private _usuariosService: UsuariosServiceProvider,
              private _jwtHelper: JwtHelperService,
            private _usuarios: UsuariosServiceProvider) {
                this._url = this._httpRest.getUrl();
  }


  checkLogin() {
    let usuario:Usuario = this._usuarios.obtemUsuarioLogado();
    this._storage.get(this.jwtTokenName).then(jwt => {
      if (jwt && !this._jwtHelper.isTokenExpired(jwt) && (usuario != undefined && usuario.email != undefined) ) {
        this._httpClient.get(`${this._url}authenticate`)
          .subscribe(() => this.authUser.next(jwt),
            (err) => this._storage.remove(this.jwtTokenName).then(() => this.authUser.next(null)));
        // OR
        // this.authUser.next(jwt);
      }
      else {
        this._storage.remove(this.jwtTokenName).then(() => this.authUser.next(null));
      }
    });
  }

  login(values: any): Observable<any> {
    return this._httpClient.post(`${this._url}api/login`, values, {responseType: 'text'})
      .pipe(tap(jwt => this.handleJwtResponse(jwt, values)));
  }

  logout() {
    return this._storage.remove(this.jwtTokenName).then(() => this.authUser.next(null));
  }

  signup(values: any): Observable<any> {
    return this._httpClient.post(`${this._url}signup`, values, {responseType: 'text'})
      .pipe(tap(jwt => {
        if (jwt !== 'EXISTS') {
          return this.handleJwtResponse(jwt, values);
        }
        return jwt;
      }));
  }

  private handleJwtResponse(jwt: string, usuario:Usuario) {
    return this._storage.set(this.jwtTokenName, jwt)
      .then(() => {this.authUser.next(jwt);
        this._httpRest.criarHeaderAutorizacao(jwt);
        localStorage.setItem('jwt_token', jwt);
        this._usuariosService.setUsuarioLogado(usuario, jwt);
      })
      .then(() => {localStorage.setItem('jwt_token', jwt); return jwt;});
  }

}
