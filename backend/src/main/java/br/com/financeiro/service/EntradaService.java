package br.com.financeiro.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import javax.swing.text.DateFormatter;
import javax.transaction.Transactional;

import br.com.financeiro.models.Referencias;
import br.com.financeiro.models.Saida;
import br.com.financeiro.repository.ReferenciasRepository;
import br.com.financeiro.repository.SaidaRepository;
import br.com.financeiro.util.Datas;
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
	private ReferenciasService referenciasService;

	public List<Entrada> obterListaEntrada(Long idConta){
		return entradaRepository.findAllByContaIdContaAndIsDeletadoFalse(idConta);
	}

	public List<Entrada> obterListaEntradaReferencia(Long idConta, String referencia){
		DateTimeFormatter formato = DateTimeFormatter.ofPattern("dd/MM/yyyy");
		if ( !referencia.equals("Todas")){
			LocalDate dataInicio = Datas.converterReferenciaDataStringFormatada(referencia);
			LocalDate dataFim = dataInicio.plusDays(30);

			return entradaRepository.findAllByContaIdContaAndIsDeletadoFalseAndDataEntradaBetween(idConta,dataInicio.toString(),dataFim.toString() );
		}else{
			return obterListaEntrada(idConta);
		}
	}



	public void salvarEAtualizar(List<Entrada> entradas, Long idConta) {
		Conta conta = new Conta();
		conta.setIdConta(idConta);
		for(Entrada entrada: entradas) {
			entrada.setConta(conta);
			entradaRepository.save(entrada);
		}
		
	}
	
	public void excluirEntrada(Long idEntrada) {
		Entrada entrada = entradaRepository.getOne(idEntrada);
		entrada.setIsDeletado(true);
		Conta conta = new Conta();
		conta.setIdConta(entrada.getConta().getIdConta());
		entradaRepository.save(entrada);

		Long idConta = entrada.getConta().getIdConta();
		String dataRecebida = entrada.getDataEntrada().substring(0,7).replace("-", "");
		String referencia = dataRecebida.substring(4,6).concat(dataRecebida.substring(0,4));
		referenciasService.verificarDeletarReferencia(idConta, referencia);
	}



}
