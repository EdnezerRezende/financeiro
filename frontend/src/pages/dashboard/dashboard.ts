import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { EntradaServiceProvider } from '../../providers/entrada-service/entrada-service';
import { ReferenciaServiceProvider } from '../../providers/referencia-service/referencia-service';
import { Conta } from '../../modelos/conta';
import { Entrada } from '../../modelos/entrada';
import { Referencia } from '../../modelos/referencia';
import { SaidaServiceProvider } from '../../providers/saida-service/saida-service';
import { Saida } from '../../modelos/saida';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  valorTotalEntrada:number = 0;
  valorTotalSaida:number = 0;

  public colunas:string[] = ['Entradas', 'Saídas'];
  public dados:Number[] = [this.valorTotalEntrada, this.valorTotalSaida];
  public tipoGrafico:string = 'doughnut';

  referenciaSelecionado: Referencia;
  referencias: Referencia[];

  entradas:Entrada[];
  saidas:Saida[];


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController, private _entradaService: EntradaServiceProvider,
    private _saidaService: SaidaServiceProvider,
    private _referenciaService: ReferenciaServiceProvider) {
      this.entradas = new Array<Entrada>();
      this.saidas = new Array<Saida>();
      this.obterReferencias();
      // this.obterEntradas();
      setTimeout(()=>{
        this.calcularValores();
      });
  }

  selecionarReferencia(referencia:any){
    let loading = this.obterLoading();
    loading.present();
    let conta: Conta =  JSON.parse(localStorage.getItem('conta'));
    
    let ref:string = "Todas";
    if (this.referenciaSelecionado.referencia != undefined ){
      ref = this.referenciaSelecionado.referencia.replace('/', '');
    }

    this.obterEntradasPorReferencia(conta, loading, ref);
    this.obterSaidasPorReferencia(conta, loading, ref);
    setTimeout(()=>{
      this.calcularValores();
    }, 1000);
  }

  calcularValores(){
    this.valorTotalEntrada = 0;
    this.valorTotalSaida = 0;

    this.entradas.forEach(entrada => {
      this.valorTotalEntrada += entrada.valor;
    });

    this.saidas.forEach(saida=>{
      this.valorTotalSaida += saida.valor;
    });

    this.dados = new Array<Number>();
    this.dados.push(this.valorTotalEntrada);
    this.dados.push(this.valorTotalSaida);

  }
  private obterEntradasPorReferencia(conta: Conta, loading, ref:string) {
    
    this._entradaService.obterEntradasPorReferencia(conta.idConta, ref)
      .subscribe((entrada: Entrada[]) => {
        this.entradas = entrada;
      }, (err) => {
        // loading.dismiss();
        this._alertCtrl.create({
          title: 'Error',
          subTitle: 'Não foi possível obter Entradas',
          buttons: [
            {
              text: 'Ok'
            }
          ]
        }).present();
      });
  }

  private obterSaidasPorReferencia(conta: Conta, loading, ref:string) {
    this._saidaService.obterSaidasPorReferencia(conta.idConta, ref)
      .subscribe((saidas: Saida[]) => {
        loading.dismiss();
        this.saidas = saidas;
      }, (err) => {
        loading.dismiss();
        this._alertCtrl.create({
          title: 'Error',
          subTitle: 'Não foi possível obter Entradas',
          buttons: [
            {
              text: 'Ok'
            }
          ]
        }).present();
      });
  }

  obterReferencias(){
    let loading = this.obterLoading();
    loading.present();
    let conta: Conta =  JSON.parse(localStorage.getItem('conta'));
    
    this._referenciaService.obterReferencias(conta.idConta)
    .subscribe((referencias: Referencia[]) => {
      loading.dismiss();
      this.referencias = referencias.sort( (n1,n2) => {
        if (n1.referencia > n2.referencia) {
            return 1;
        }
        if (n1.referencia < n2.referencia) {
            return -1;
        }
        return 0;
      })

      this.referencias = referencias.sort( (n1,n2) => {
        let ano1 = n1.referencia.substring(3,8);
        let ano2 = n2.referencia.substring(3,8);
        if (ano1 > ano2) {
          return 1;
        }
        if (ano1 < ano2) {
            return -1;
        }
        return 0;
      })
    },
    (err) => {
      loading.dismiss();
      this._alertCtrl.create({
        title: 'Error',
        subTitle: 'Não foi possível obter referencias',
        buttons: [
          {
            text: 'Ok'
          }
        ]
      }).present();
    })
  }

  compareRefencia(e1, e2) {
    return e1.referencia === e2.referencia;
  }

  obterEntradas(){
    let loading = this.obterLoading();
    loading.present();
    let conta: Conta =  JSON.parse(localStorage.getItem('conta'));
    
    this._entradaService.obterEntradas(conta.idConta)
    .subscribe(
      (entradas:Entrada[]) => {
        loading.dismiss();
        
        this.entradas = entradas;
        
        let conta:Conta = JSON.parse(localStorage.getItem('conta'));
        
        conta.entradas = this.entradas;

      },
    (err) => {
        loading.dismiss();
        this._alertCtrl.create({
          title: 'Error',
          subTitle: 'Não foi possível obter registros de entradas',
          buttons: [
            {
              text: 'Ok'
            }
          ]
        }).present();
      }
    );

    
  }

  obterLoading(){
    return this._loadingCtrl.create({
      content: 'Carregando...'
    });
  }

 // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

}
