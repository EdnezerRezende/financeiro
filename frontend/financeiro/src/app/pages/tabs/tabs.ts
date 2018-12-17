import { Component } from '@angular/core';
import { ListPage } from '../list/list.page';
import { HomePage } from '../home/home.page';
import { NavController, NavParams } from '@ionic/angular';


@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1;
  tab2;
  tabhome;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tabhome = HomePage;
    this.tab1 = ListPage.name;
  }

  public doChange(ev:any) {
		if (ev.length()>1) {
			ev.popToRoot();
		 }
	}
}
