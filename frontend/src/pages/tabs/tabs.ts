import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { EntradasPage } from '../entradas/entradas';
import { SaidasPage } from '../saidas/saidas';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = SaidasPage.name;
  tab4Root = EntradasPage.name;

  constructor() {

  }
}
