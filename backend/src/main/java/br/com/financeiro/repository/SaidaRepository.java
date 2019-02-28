package br.com.financeiro.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.financeiro.models.Entrada;
import br.com.financeiro.models.Saida;

@Repository
public interface SaidaRepository extends JpaRepository<Saida, Long> {

	List<Saida> findAllByContaIdContaAndIsDeletadoFalse(Long idConta);

	List<Saida> findAllByContaIdContaAndIsDeletadoFalseAndDataEntradaBetween(Long conta_idConta, String dataEntrada, String dataFim);
}
