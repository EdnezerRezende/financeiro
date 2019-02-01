import { Conta } from "./conta";

export class Entrada{
    public idEntrada: number;
    public nomeEntrada: string;
    public descricao: string;
    public fonte:string;
    public valor: any;
    public origem: string;
    public dataEntrada: string;
    public isDeletado: boolean;
    public conta: Conta;
}