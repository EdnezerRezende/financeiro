package br.com.financeiro.models;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Entrada  implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long idEntrada;
	private String nomeEntrada;
	private String descricao;
	private String fonte;
	private Long valor;
	private String origem;
	private String dataEntrada;
	private Boolean isDeletado;

	@JsonIgnore
	@ManyToOne
	@JoinTable(name = "conta_entradas", joinColumns = {@JoinColumn(name = "entrada_id", referencedColumnName = "idEntrada")},
    inverseJoinColumns = {@JoinColumn(name = "conta_id", referencedColumnName = "idConta")})
	private Conta conta;

	public Entrada(String nomeEntrada, String descricao, String fonte, Long valor, String origem, String dataEntrada,
			Conta conta, Boolean deletado) {
		super();
		this.nomeEntrada = nomeEntrada;
		this.descricao = descricao;
		this.fonte = fonte;
		this.valor = valor;
		this.origem = origem;
		this.dataEntrada = dataEntrada;
		this.conta = conta;
		this.isDeletado = deletado;
	}
	
	
}
