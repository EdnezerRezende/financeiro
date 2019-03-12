package br.com.financeiro.service;

import br.com.financeiro.ExceptionsCustons.RegistroDuplicadoException;
import br.com.financeiro.infra.validator.Validator;
import br.com.financeiro.models.Cartao;
import br.com.financeiro.models.Conta;
import br.com.financeiro.models.FaturaCartao;
import br.com.financeiro.models.Usuario;
import br.com.financeiro.repository.CartaoRepository;
import br.com.financeiro.repository.ContaRepository;
import br.com.financeiro.repository.FaturaRepository;
import br.com.financeiro.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CartaoService {

	@Autowired
	private CartaoRepository cartaoRepository;

	@Autowired
	private ContaRepository contaRepository;

	@Autowired
	private FaturaRepository faturaRepository;


	public List<Cartao> obterListaCartao(Long idConta){
		return cartaoRepository.getAllByContaEquals(idConta);
	}
	
	public void salvarEAtualizar(Cartao cartao, Long idConta) throws RegistroDuplicadoException {
		Cartao cartaoExistente = cartaoRepository.getCartaoByNumeroCartaoEquals(cartao.getNumeroCartao());
		if (Validator.isNull(cartaoExistente) && cartaoExistente.getNumeroCartao() != null){
			throw new RegistroDuplicadoException("Cartão informado já cadastrado anteriormente");
		}

		Conta conta = new Conta();
		conta.setIdConta(idConta);
		cartao.setConta(conta);
		cartaoRepository.save(cartao);

		FaturaCartao faturaCartao = new FaturaCartao();
		faturaCartao.setCartao(cartao);
		faturaCartao.setSituacao(true);


		LocalDate dataHoje = LocalDate.now();
		LocalDate dataFaturaProxima = LocalDate.now();
		dataFaturaProxima.ofEpochDay(cartao.getDiaVencimento());

		if ( dataHoje.getDayOfMonth() >= cartao.getDiaVencimento()-10){
			faturaCartao.setDataPagamento(dataHoje);
		}else{
			faturaCartao.setDataPagamento(dataFaturaProxima);
		}

		faturaRepository.save(faturaCartao);
	}
	

	public void excluirCartao(Long idCartao) {
		cartaoRepository.deleteById(idCartao);
	}
	
	public Cartao obterCartaoById(Long id) {
		return cartaoRepository.getOne(id);
	}
	
}
