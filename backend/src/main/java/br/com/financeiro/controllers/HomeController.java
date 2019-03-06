package br.com.financeiro.controllers;

import br.com.financeiro.models.Saida;
import br.com.financeiro.repository.SaidaRepository;
import org.apache.tomcat.jni.Local;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

import java.time.LocalDate;
import java.util.List;


@RestController
@Api(value = "Home", description = "home")
public class HomeController {

	@Autowired
	private SaidaRepository saidaRepository;
	
	@ApiOperation(value = "Lista de contas a vencer por conta ")
	@GetMapping(value = "/listaContasAVencer/conta/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	@RequestMapping(value = "listaContasAVencer/conta/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	@CrossOrigin
	public List<Saida> obterContasAVencer(@PathVariable(value = "id") Long idConta) {

		LocalDate dataInicio = LocalDate.now();
		LocalDate dataFim = LocalDate.now().plusDays(3);

		return saidaRepository.findAllByContaIdContaAndIsDeletadoFalseAndDataSaidaBetween(idConta, dataInicio, dataFim);
	}
}
