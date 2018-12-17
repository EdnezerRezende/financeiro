package br.com.financeiro.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.financeiro.models.Conta;

@Repository
public interface ContaRepository extends JpaRepository<Conta, Long> {

}
