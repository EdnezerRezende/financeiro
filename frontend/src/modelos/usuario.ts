import { Conta } from "./conta";

export class Usuario {
    id:number;
    nome: string;
    dataNascimento: Date;
    email: string;
    telefone: string;
    senha: string;
    matricula: string;
    endereco: string;
    cep: string;
    cpf: string;
    dataCadastro:Date;
    bloqueado: boolean;
    conta:Conta;

}