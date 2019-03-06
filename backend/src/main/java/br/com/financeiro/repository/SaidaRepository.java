package br.com.financeiro.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.financeiro.models.Entrada;
import br.com.financeiro.models.Saida;

@Repository
public interface SaidaRepository extends JpaRepository<Saida, Long> {

	List<Saida> findAllByContaIdContaAndIsDeletadoFalseAndIsPagoFalse(Long idConta);

	List<Saida> findAllByContaIdContaAndIsDeletadoFalseAndDataSaidaBetween(Long conta_idConta, LocalDate dataEntrada, LocalDate dataFim);
}
