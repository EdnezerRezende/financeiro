package br.com.financeiro.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.hibernate.annotations.Fetch;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

@Entity
@Data
public class FaturaCartao implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long idFatura;

	private LocalDate dataPagamento;

	private Boolean situacao;//Aberta ou fechada

	@OneToMany(mappedBy = "faturaCartao", cascade = javax.persistence.CascadeType.ALL, fetch = FetchType.EAGER)
	@Fetch(org.hibernate.annotations.FetchMode.SUBSELECT)
	private List<DetalhamentoFatura> itensFatura;

	@JsonIgnore
	@ManyToOne
	@JoinTable(name = "cartao_faturaCartao", joinColumns = {@JoinColumn(name = "id_fatura", referencedColumnName = "idFatura")},
			inverseJoinColumns = {@JoinColumn(name = "id_cartao", referencedColumnName = "idCartao")})
	private Cartao cartao;

	

}