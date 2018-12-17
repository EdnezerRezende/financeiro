package br.com.financeiro.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.financeiro.models.Referencias;

@Repository
public interface ReferenciasRepository extends JpaRepository<Referencias, Long> {

}
