package br.com.financeiro.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.financeiro.models.Entrada;

@Repository
public interface EntradaRepository extends JpaRepository<Entrada, Long> {
	
	List<Entrada> findAllByContaIdContaAndIsDeletadoFalse(Long idConta);

	List<Entrada> findAllByContaIdContaAndIsDeletadoFalseAndDataEntradaBetween(Long conta_idConta, LocalDate dataEntrada, LocalDate dataFim);
}
