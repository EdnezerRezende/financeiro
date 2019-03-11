package br.com.financeiro.service;

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


	public List<Conta> obterListaCartao(){
		return cartaoRepository.findAll();
	}
	
	public void salvarEAtualizar(Cartao cartao, Long idConta) {
		cartao.setConta(contaRepository.getOne(idConta));
		cartaoRepository.save(cartao);

		FaturaCartao faturaCartao = new FaturaCartao();
		faturaCartao.setCartao(cartao);
		faturaCartao.setSituacao(true);

		LocalDate dataHoje = LocalDate.now();

		if ( dataHoje.isBefore(cartao.getDataVencimento())){
			faturaCartao.setDataPagamento(cartao.getDataVencimento());
		}else{
			dataHoje.withDayOfMonth(cartao.getDataVencimento().getDayOfMonth());
			faturaCartao.setDataPagamento(cartao.getDataVencimento().plusMonths(1));

		}

		faturaRepository.save(faturaCartao);
	}
	

	public void excluirCartao(Long idCartao) {
		cartaoRepository.deleteById(idConta);
	}
	
	public Optional<Conta> obterCartaoById(Long id) {
		return cartaoRepository.findById(id);
	}
	
}
