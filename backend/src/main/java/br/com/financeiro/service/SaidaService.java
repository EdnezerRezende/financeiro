package br.com.financeiro.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.financeiro.models.Conta;
import br.com.financeiro.models.Entrada;
import br.com.financeiro.models.Saida;
import br.com.financeiro.repository.ContaRepository;
import br.com.financeiro.repository.SaidaRepository;

@Service
@Transactional
public class SaidaService {

	@Autowired
	private SaidaRepository saidaRepository;
	
	@Autowired
	private ContaRepository contaRepository;
	
	public List<Saida> obterListaSaida(Long idConta){
		return saidaRepository.findAllByContaIdContaAndIsDeletadoFalse(idConta);
	}
	
	public void salvarEAtualizar(List<Saida> saidas, Long idConta) {
		Conta conta = contaRepository.getOne(idConta);
		conta.setEntradas(null);
		conta.setSaidas(null);
		for(Saida saida: saidas) {
			saida.setConta(conta);
			saida.isParcelado();
			saidaRepository.save(saida);
		};
	}
	
	public void excluirSaida(Long idSaida) {
		Saida saida = saidaRepository.getOne(idSaida);
		saida.setIsDeletado(true);
		saidaRepository.save(saida);
	}
}
