package br.com.financeiro.models;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import org.hibernate.annotations.Fetch;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Data;

@Entity
@Data
public class Conta implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long idConta;
	private String nomeConta;
	private String descricao;
	
	@OneToMany(mappedBy = "conta", cascade = javax.persistence.CascadeType.ALL, fetch = FetchType.EAGER)
	@Fetch(org.hibernate.annotations.FetchMode.SUBSELECT)
	private List<Entrada> entradas;
	
	@OneToMany(mappedBy = "conta", cascade = javax.persistence.CascadeType.ALL, fetch = FetchType.EAGER)
	@Fetch(org.hibernate.annotations.FetchMode.SUBSELECT)
	private List<Saida> saidas;

	@OneToMany(mappedBy = "conta", cascade = javax.persistence.CascadeType.ALL, fetch = FetchType.EAGER)
	@Fetch(org.hibernate.annotations.FetchMode.SUBSELECT)
	private List<Cartao> cartoes;

	@OneToMany
	@JoinTable(name = "usuario_conta", joinColumns = {@JoinColumn(name = "conta_id", referencedColumnName = "idConta")},
    inverseJoinColumns = {@JoinColumn(name = "usuario_id", referencedColumnName = "id")})
	@JsonBackReference(value="usuarios")
	private List<Usuario> usuarios;

	public Conta() {
	}

	public Conta(Long idConta, String nomeConta, String descricao, List<Entrada> entradas, List<Saida> saidas,
			List<Usuario> usuarios) {
		this.idConta = idConta;
		this.nomeConta = nomeConta;
		this.descricao = descricao;
		this.entradas = entradas;
		this.saidas = saidas;
		this.usuarios = usuarios;
	}

	

}