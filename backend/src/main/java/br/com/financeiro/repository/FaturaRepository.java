package br.com.financeiro.repository;

import br.com.financeiro.models.Cartao;
import br.com.financeiro.models.FaturaCartao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FaturaRepository extends JpaRepository<FaturaCartao, Long> {
    public FaturaCartao findFirstBySituacaoIsTrueAndCartaoEquals(Cartao cartao);
}
