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
public class DetalhamentoFatura implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long idDetalhamento;

	private String nomeDetalhamento;

	private String descricaoDetalhamento;

	private LocalDate dataCompra;

	private String parcela;

	@JsonIgnore
	@ManyToOne
	@JoinTable(name = "faturaCartao_detalhamentoFatura", joinColumns = {@JoinColumn(name = "id_detalhamento", referencedColumnName = "idDetalhamento")},
			inverseJoinColumns = {@JoinColumn(name = "id_fatura", referencedColumnName = "idFatura")})
	private FaturaCartao faturaCartao;





	

}