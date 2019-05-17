import { Conta } from "./conta";
import { FaturasCartao } from "./faturas_cartao";

export class FaturaCartaoDTO{
    public idFatura: number;
    public dataPagamento: Date;
    public situacao: boolean;
   
}