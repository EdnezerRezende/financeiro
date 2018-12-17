package br.com.financeiro.models;



import lombok.Data;

@Data
public class EmailPedido {
    private Usuario usuario;
    private String emailDestinatario;
}
