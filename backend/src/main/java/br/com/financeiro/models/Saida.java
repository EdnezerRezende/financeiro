package br.com.financeiro.models;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
//@NoArgsConstructor
public class Saida  implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long idSaida;
	private String nomeSaida;
	private String descricao;
	private BigDecimal valor;
	private String origem;
	private LocalDate dataSaida;
	private Long qtdParcelas;
	private Boolean ehParcelado;
	private Boolean isDeletado;
	private Boolean isPago;
	private Boolean isCredito;
	
	@JsonIgnore
	@ManyToOne
	@JoinTable(name = "conta_saidas", joinColumns = {@JoinColumn(name = "saida_id", referencedColumnName = "idSaida")},
    inverseJoinColumns = {@JoinColumn(name = "conta_id", referencedColumnName = "idConta")})
	private Conta conta;

	public Saida(){

	}
    public Saida(Saida saida) {
    	this.dataSaida = saida.getDataSaida();
		this.descricao = saida.getDescricao();
		this.conta = saida.getConta();
		this.ehParcelado = saida.getEhParcelado();
		this.isCredito = saida.getIsCredito();
		this.nomeSaida = saida.getNomeSaida();
		this.valor = saida.getValor();
		this.origem = saida.getOrigem();
		this.qtdParcelas = saida.getQtdParcelas();
		this.isDeletado = saida.getIsDeletado();
		this.isPago = saida.getIsPago();

    }
}
