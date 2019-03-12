package br.com.financeiro.repository;

import br.com.financeiro.models.Cartao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartaoRepository extends JpaRepository<Cartao, Long> {
    public Cartao getCartaoByNumeroCartaoEquals(Long numeroCartao);
    public List<Cartao> getAllByContaEquals(Long idConta);
}
