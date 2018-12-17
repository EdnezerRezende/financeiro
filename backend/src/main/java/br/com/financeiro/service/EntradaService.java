package br.com.financeiro.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.financeiro.models.Conta;
import br.com.financeiro.models.Entrada;
import br.com.financeiro.repository.ContaRepository;
import br.com.financeiro.repository.EntradaRepository;

@Service
@Transactional
public class EntradaService {

	@Autowired
	private EntradaRepository entradaRepository;
	
	@Autowired
	private ContaRepository contaRepository;
	
	public List<Entrada> obterListaEntrada(Long idConta){
		return entradaRepository.findAllByContaIdContaAndIsDeletadoFalse(idConta);
	}
	
	public void salvarEAtualizar(List<Entrada> entradas, Long idConta) {
		Conta conta = contaRepository.getOne(idConta);
		conta.setEntradas(null);
		conta.setSaidas(null);
		for(Entrada entrada: entradas) {
			entrada.setConta(conta);
			entradaRepository.save(entrada);
		};
		
	}
	
	public void excluirEntrada(Long idEntrada) {
		Entrada entrada = entradaRepository.getOne(idEntrada);
		entrada.setIsDeletado(true);
		entradaRepository.save(entrada);
	}
	
}
