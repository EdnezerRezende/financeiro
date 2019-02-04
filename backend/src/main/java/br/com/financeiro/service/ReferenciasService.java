package br.com.financeiro.service;

import br.com.financeiro.models.Conta;
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

	public List<Referencias> obterReferencias(Long idConta){

		return referenciasRepository.findAll();
	}

}
