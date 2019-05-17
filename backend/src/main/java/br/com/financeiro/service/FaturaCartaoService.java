package br.com.financeiro.service;

import br.com.financeiro.models.Cartao;
import br.com.financeiro.models.FaturaCartao;
import br.com.financeiro.repository.CartaoRepository;
import br.com.financeiro.repository.FaturaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class FaturaCartaoService {

    @Autowired
    private FaturaRepository faturaRepository;

    @Autowired
    private CartaoRepository cartaoRepository;

    public List<FaturaCartao> obterListaFaturaCartao(Long idCartao){
        Cartao cartao = cartaoRepository.getOne(idCartao);
        return faturaRepository.findFirstBySituacaoIsTrueAndCartaoEquals(cartao);
    }
}
