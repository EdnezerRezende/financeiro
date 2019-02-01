package br.com.financeiro.models;

import java.io.Serializable;
import java.math.BigDecimal;

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
@NoArgsConstructor
public class Saida  implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long idSaida;
	private String nomeSaida;
	private String descricao;
	private BigDecimal valor;
	private String origem;
	private String dataSaida;
	private Long qtdParcelas;
	private Boolean ehParcelado;
	private Boolean isDeletado;
	private Boolean isPago;
	
	@JsonIgnore
	@ManyToOne
	@JoinTable(name = "conta_saidas", joinColumns = {@JoinColumn(name = "saida_id", referencedColumnName = "idSaida")},
    inverseJoinColumns = {@JoinColumn(name = "conta_id", referencedColumnName = "idConta")})
	private Conta conta;
}
