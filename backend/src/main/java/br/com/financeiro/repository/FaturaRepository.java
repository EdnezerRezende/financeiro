package br.com.financeiro.repository;

import br.com.financeiro.models.Cartao;
import br.com.financeiro.models.FaturaCartao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FaturaRepository extends JpaRepository<FaturaCartao, Long> {
    public List<FaturaCartao> findFirstBySituacaoIsTrueAndCartaoEquals(Cartao cartao);

}
