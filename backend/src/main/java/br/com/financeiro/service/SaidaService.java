package br.com.financeiro.service;

import java.time.LocalDate;
import java.time.Month;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.List;

import javax.transaction.Transactional;

import br.com.financeiro.models.Referencias;
import br.com.financeiro.repository.ReferenciasRepository;
import br.com.financeiro.util.Datas;
import org.apache.tomcat.jni.Local;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.financeiro.models.Conta;
import br.com.financeiro.models.Saida;
import br.com.financeiro.repository.ContaRepository;
import br.com.financeiro.repository.SaidaRepository;

@Service
@Transactional
public class SaidaService {

	@Autowired
	private SaidaRepository saidaRepository;

	@Autowired
	private ReferenciasRepository referenciasRepository;
	
	@Autowired
	private ContaRepository contaRepository;
	
	public List<Saida> obterListaSaida(Long idConta){
		return saidaRepository.findAllByContaIdContaAndIsDeletadoFalse(idConta);
	}

	public List<Saida> obterListaSaidaReferencia(Long idConta, String referencia){

		DateTimeFormatter formato = DateTimeFormatter.ofPattern("dd-MM-yyyy");

		LocalDate dataInicio = Datas.converterReferenciaDataStringFormatada(referencia);

		LocalDate dataFim = dataInicio.plusDays(30);

		return saidaRepository.findAllByContaIdContaAndIsDeletadoFalseAndDataSaidaBetween(idConta,dataInicio.format(formato),dataFim.format(formato) );
	}

	public void salvarEAtualizar(List<Saida> saidas, Long idConta) {
        Conta conta = new Conta();
        conta.setIdConta(idConta);
		for(Saida saida: saidas) {
			saida.setConta(conta);
			if ( saida.getEhParcelado() ) {
				LocalDate dataRecebida = saida.getDataSaida();
				for ( int i = 0; i < saida.getQtdParcelas(); i++){
					Saida saidaTemp = new Saida(saida);

					saidaTemp.setDataSaida(dataRecebida.plus(30, ChronoUnit.DAYS));

					dataRecebida = saidaTemp.getDataSaida();

					gravarReferencia(saidaTemp);
					saidaRepository.save(saidaTemp);
					saidaRepository.flush();
				}
			}else {
				if ( saida.getIsCredito()){
					saida.setDataSaida(saida.getDataSaida().plus(30, ChronoUnit.DAYS));
				}
				gravarReferencia(saida);
				saidaRepository.save(saida);
			}
		};
	}

	private void gravarReferencia(Saida saida) {
		Referencias referencia = new Referencias();
		List<Referencias> referencias = referenciasRepository.findAll();

		referencia.setReferencia(saida.getDataSaida().format(DateTimeFormatter.ofPattern("MM/yyyy")));

		boolean grava = true;
		for(int i = 0; i < referencias.size(); i++){
			if ( referencias.get(i).getReferencia().equals(referencia.getReferencia()) ){
				grava = false;
				break;
			}
		}
		if ( grava){
			referenciasRepository.save(referencia);
			referenciasRepository.flush();
		}
	}

	public void excluirSaida(Long idSaida) {
		Saida saida = saidaRepository.getOne(idSaida);
		saida.setIsDeletado(true);
		saidaRepository.save(saida);
	}
}
