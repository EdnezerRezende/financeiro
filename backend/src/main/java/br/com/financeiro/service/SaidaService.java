package br.com.financeiro.service;

import java.io.FileInputStream;
import java.io.InputStream;
import java.time.LocalDate;
import java.time.Month;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import br.com.financeiro.models.Referencias;
import br.com.financeiro.repository.ReferenciasRepository;
import br.com.financeiro.util.Datas;
import com.mastercard.api.core.ApiConfig;
import com.mastercard.api.core.exception.ApiException;
import com.mastercard.api.core.model.RequestMap;
import com.mastercard.api.core.model.map.SmartMap;
import com.mastercard.api.core.security.oauth.OAuthAuthentication;
import com.mastercard.api.maws.ABU;
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
	private ReferenciasService referenciasService;
	
	public List<Saida> obterListaSaida(Long idConta){
		return saidaRepository.findAllByContaIdContaAndIsDeletadoFalse(idConta);
	}

	public List<Saida> obterListaSaidaReferencia(Long idConta, String referencia){
		if ( !referencia.equals("Todas")) {
			LocalDate dataInicio = Datas.converterReferenciaDataStringFormatada(referencia);

			LocalDate dataFim = dataInicio.plusDays(30);

			return saidaRepository.findAllByContaIdContaAndIsDeletadoFalseAndDataSaidaBetween(idConta, dataInicio, dataFim);
		}else{
			return obterListaSaida(idConta);
		}
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
		Conta conta = new Conta();
		conta.setIdConta(saida.getConta().getIdConta());
		saida.setConta(conta);
		saidaRepository.save(saida);

		verificarReferencia(saida);
	}

	public void verificarReferencia(Saida saida) {
		Long idConta = saida.getConta().getIdConta();
		String dataRecebida = saida.getDataSaida().toString();
		String referencia = dataRecebida.substring(5,7).concat(dataRecebida.substring(0,4));
		referenciasService.verificarDeletarReferencia(idConta, referencia);
	}


	public static void main(String[] args) throws Exception {

		String consumerKey = "DwUcXZJfYoxAek0gsfyDSwiyDC_Eea1bM0p-5uOQ05e048df!d0237e6f190f48b78b87445ad905e8070000000000000000";   // You should copy this from "My Keys" on your project page e.g. UTfbhDCSeNYvJpLL5l028sWL9it739PYh6LU5lZja15xcRpY!fd209e6c579dc9d7be52da93d35ae6b6c167c174690b72fa
		String keyAlias = "keyalias";   // For production: change this to the key alias you chose when you created your production key
		String keyPassword = "keystorepassword";   // For production: change this to the key alias you chose when you created your production key
		InputStream is = new FileInputStream("C:\\Users\\f546011\\project\\Financeiro-sandbox.p12"); // e.g. /Users/yourname/project/sandbox.p12 | C:\Users\yourname\project\sandbox.p12
		ApiConfig.setAuthentication(new OAuthAuthentication(consumerKey, is, keyAlias, keyPassword));   // You only need to set this once
		ApiConfig.setDebug(true);   // Enable http wire logging
		ApiConfig.setSandbox(true); // For production: use ApiConfig.setSandbox(false);

		try {
			RequestMap map = new RequestMap();
			map.set("jsonrpc", "2.0");
			map.set("method", "abu");
			map.set("params.merchantId", "000111222333456");
			map.set("params.oldAccountNumber", "5573491171027315");
			map.set("params.oldExpirationDate", "0714");
			map.set("params.discretionaryData", "RandomData");
			map.set("params.subMerchantId", "000000000000001");
			map.set("id", "a1234567890");
			ABU response = ABU.post(map);

			out(response, "jsonrpc"); //-->2.0
			out(response, "id"); //-->a1234567890
			out(response, "result.merchantId"); //-->000111222333456
			out(response, "result.oldAccountNumber"); //-->5573491171027315
			out(response, "result.oldExpirationDate"); //-->0714
			out(response, "result.discretionaryData"); //-->RandomData
			out(response, "result.subMerchantId"); //-->000000000000001
			out(response, "result.newAccountNumber"); //-->5573491171027315
			out(response, "result.newExpirationDate"); //-->0318
			out(response, "result.reasonIdentifier"); //-->EXPIRY
			out(response, "status"); //-->true

		} catch (ApiException e) {
			err("HttpStatus: "+e.getHttpStatus());
			err("Message: "+e.getMessage());
			err("ReasonCode: "+e.getReasonCode());
			err("Source: "+e.getSource());
		}
	}

	public static void out(SmartMap response, String key) {
		System.out.println(key+"-->"+response.get(key));
	}

	public static void out(Map<String,Object> map, String key) {
		System.out.println(key+"--->"+map.get(key));
	}

	public static void err(String message) {
		System.err.println(message);
	}
}
