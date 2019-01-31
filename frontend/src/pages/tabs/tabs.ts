import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { EntradasPage } from '../entradas/entradas';
import { SaidasPage } from '../saidas/saidas';
import { EntradaCadastrarPage } from '../entrada-cadastrar/entrada-cadastrar';
import { DashboardPage } from '../dashboard/dashboard';
import { SaidaCadastrarPage } from '../saida-cadastrar/saida-cadastrar';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = DashboardPage.name;
  tab3Root = SaidaCadastrarPage.name;
  tab4Root = EntradaCadastrarPage.name;

  constructor() {

  }
}
