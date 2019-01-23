import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { EntradasPage } from '../entradas/entradas';
import { SaidasPage } from '../saidas/saidas';
import { EntradaCadastrarPage } from '../entrada-cadastrar/entrada-cadastrar';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = SaidasPage.name;
  tab4Root = EntradaCadastrarPage.name;

  constructor() {

  }
}
