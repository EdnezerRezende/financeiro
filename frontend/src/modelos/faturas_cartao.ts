import { CartaoDTO } from "./cartao.dto";
import { DetalhamentoFatura } from "./detalhamento_fatura.dto";

export class FaturasCartao{
    public idFatura: number;
    public dataPagamento: Date;
    public situacao: boolean;
    public itensFatura: DetalhamentoFatura[];
    public cartao: CartaoDTO;
}