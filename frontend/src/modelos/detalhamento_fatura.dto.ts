import { FaturasCartao } from "./faturas_cartao";

export class DetalhamentoFatura{
    public idDetalhamento: number;
    public nomeDetalhamento: string;
    public descricaoDetalhamento: string;
    public dataCompra: Date;
    public parcela: string;
    public faturaCartao: FaturasCartao;
}