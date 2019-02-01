import { Conta } from "./conta";

export class Saida{
    public idSaida: number;
    public nomeSaida: string;
    public descricao: string;
    public fonte:string;
    public valor: any;
    public origem: string;
    public dataSaida: string;
    public isDeletado: boolean;
    public conta: Conta;
    public isPago: boolean;
    public qtdParcelas: number;
    public ehParcelado: boolean;
}