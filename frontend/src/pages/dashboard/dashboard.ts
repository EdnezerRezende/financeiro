import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { EntradaServiceProvider } from '../../providers/entrada-service/entrada-service';
import { ReferenciaServiceProvider } from '../../providers/referencia-service/referencia-service';
import { Conta } from '../../modelos/conta';
import { Entrada } from '../../modelos/entrada';
import { Referencia } from '../../modelos/referencia';
import { SaidaServiceProvider } from '../../providers/saida-service/saida-service';
import { Saida } from '../../modelos/saida';
import * as moment from 'moment';  

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  valorTotalEntrada:number = 0;
  valorTotalSaida:number = 0;
  
  // Grafico pizza
  public colunas:string[] = ['Entradas', 'Saídas'];
  public dados:Number[] = [this.valorTotalEntrada, this.valorTotalSaida];
  public tipoGrafico:string = 'doughnut';

  // Grafico em barras
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartReferencias:string[] = [];
  public dadosReferencia:any[] = [{data: [],label:'Entrada'},{data: [],label:'Saída'}];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;


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
      this.referencias = new Array<Referencia>();

     
  }

  ionViewWillEnter(){
    this.referenciaSelecionado = new Referencia();
    this.referenciaSelecionado.referencia = 'Todas';
    this.obterReferencias();
    this.selecionarReferencia(undefined);
  }

  selecionarReferencia(referencia:any){
    let loading = this.obterLoading();
    loading.present();
    let conta: Conta =  JSON.parse(localStorage.getItem('conta'));
    
    let ref:string = "Todas";
    
    if (this.referenciaSelecionado != undefined && this.referenciaSelecionado.referencia != undefined 
      && this.referenciaSelecionado.referencia != 'Todas' ){
        this.barChartReferencias = new Array<string>();
        this.barChartReferencias.push(this.referenciaSelecionado.referencia);
      ref = this.referenciaSelecionado.referencia.replace('/', '');
    }
    else{
      this.barChartReferencias = new Array<string>();
      if ( this.referencias.length != 0){
        this.referencias.forEach(referencia => {
          this.barChartReferencias.push(referencia.referencia);
        });
      }
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
      let ref = entrada.dataEntrada;
      console.log(ref);
      if ( entrada.dataEntrada)
      this.valorTotalEntrada += entrada.valor;
    });
    
    this.saidas.forEach(saida=>{
      this.valorTotalSaida += saida.valor;
    });
    
    let valorSaida:number[] = [];
    let valorEntrada:number[]= [];
    if (this.referenciaSelecionado != undefined && this.referenciaSelecionado.referencia != undefined 
      && this.referenciaSelecionado.referencia != 'Todas' ){
      this.dadosReferencia= [
        {data: [this.valorTotalEntrada], label: 'Entrada'},
        {data: [this.valorTotalSaida], label: 'Saída'}
      ];
    }else{
      this.referencias.forEach(referencia => {
        let vlrEntrada = 0;
        let vlrSaida = 0;

        this.entradas.forEach(entrada => {
          let ref = moment(entrada.dataEntrada).format('MM/YYYY');
          if ( ref == referencia.referencia ){
            vlrEntrada += Number(entrada.valor);
          }
        });
        this.saidas.forEach(saida => {
          let ref = moment(saida.dataSaida).subtract(1,'months').format('MM/YYYY');
          if ( ref == referencia.referencia){
            vlrSaida += Number(saida.valor);
          }
        });

        valorSaida.push(vlrSaida);
        valorEntrada.push(vlrEntrada);
      });
      
      this.dadosReferencia = [{data:valorEntrada, label: 'Entrada'}, 
                              {data:valorSaida, label: 'Saída'}
      ];
    }
    
    
    

    this.dados = new Array<Number>();
    this.dados.push(this.valorTotalEntrada);
    this.dados.push(this.valorTotalSaida);
    console.log("Sai no calcular");
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
      });
      this.barChartReferencias = new Array<string>();
      this.referencias.forEach(referencia => {
        this.barChartReferencias.push(referencia.referencia);
      });
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
