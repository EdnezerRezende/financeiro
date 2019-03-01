package br.com.financeiro.service;

import br.com.financeiro.models.Conta;
import br.com.financeiro.models.Entrada;
import br.com.financeiro.models.Referencias;
import br.com.financeiro.models.Saida;
import br.com.financeiro.repository.ContaRepository;
import br.com.financeiro.repository.ReferenciasRepository;
import br.com.financeiro.repository.SaidaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class ReferenciasService {

	@Autowired
	private ReferenciasRepository referenciasRepository;

	@Autowired
	private EntradaService entradaService;

	@Autowired
	private SaidaService saidaService;


	public List<Referencias> obterReferencias(Long idConta){

		return referenciasRepository.findAll();
	}

	public void verificarDeletarReferencia(Long idConta, String referencia) {

		List<Entrada> entradas = entradaService.obterListaEntradaReferencia(idConta, referencia);
		List<Saida> saidas = saidaService.obterListaSaidaReferencia(idConta, referencia);

		if ( entradas.isEmpty() && saidas.isEmpty() ){
			String refFormatada = referencia.substring(0,2).concat("/").concat(referencia.substring(2,6));

			List<Referencias> referencias = referenciasRepository.findAll();

			referencias.stream().filter(ref -> refFormatada.equals(ref.getReferencia())).forEach(ref -> {
				referenciasRepository.deleteById(ref.getIdReferencia());
			});
		}
	}
}
