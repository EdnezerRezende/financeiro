package br.com.financeiro.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Fetch;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Cartao implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long idCartao;

	private String nomeCartao;

	private String bandeira;

	private String descricao;

	private Long numeroCartao;

	private String banco;

	private Long diaVencimento;

	@JsonIgnore
	@OneToMany(mappedBy = "cartao", cascade = javax.persistence.CascadeType.ALL, fetch = FetchType.EAGER)
	@Fetch(org.hibernate.annotations.FetchMode.SUBSELECT)
	private List<FaturaCartao> faturas;

	@JsonIgnore
	@ManyToOne
	@JoinTable(name = "conta_cartao", joinColumns = {@JoinColumn(name = "id_cartao", referencedColumnName = "idCartao")},
			inverseJoinColumns = {@JoinColumn(name = "conta_id", referencedColumnName = "idConta")})
	private Conta conta;

}