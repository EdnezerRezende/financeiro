package br.com.financeiro.models;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import lombok.Data;

@Entity
@Data
public class Referencias  implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Id
    @GeneratedValue
	private Long idReferencia;
	

	
}
