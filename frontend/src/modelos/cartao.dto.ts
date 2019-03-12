import { Conta } from "./conta";
import { FaturasCartao } from "./faturas_cartao";

export class CartaoDTO{
    public idCartao: number;
    public bandeira: string;
    public descricao: string;
    public numeroCartao:number;
    public banco: string;
    public diaVencimento: Date;
    public faturas: FaturasCartao[];
    public conta: Conta;
}