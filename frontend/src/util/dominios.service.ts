import { Injectable } from "@angular/core";

@Injectable()
export class DominiosService {


  constructor() {
  }

  static getKeyDominio(enumeracao, valor: string) {
    for (let key of Object.keys(enumeracao)) {
      if (key == valor) {
        return key;
      }
    }
  }
}
