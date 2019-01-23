import { Entrada } from "./entrada";
import { Saida } from "./saida";

export class Conta{
    public idConta: number;
    public nomeConta: string;
    public descricao: string;
    public entradas: Entrada[];
    public saidas:Saida[];
}