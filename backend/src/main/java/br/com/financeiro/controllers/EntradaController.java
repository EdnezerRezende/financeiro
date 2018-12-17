package br.com.financeiro.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import br.com.financeiro.models.Conta;
import br.com.financeiro.models.Entrada;
import br.com.financeiro.service.EntradaService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@Api(value = "Entrada", description = "entrada")
public class EntradaController {

	@Autowired
	private EntradaService entradaService;
	
	@ApiOperation(value = "Lista de Entradas por conta ")
	@GetMapping(value = "/listaEntradas/conta/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)	
	@RequestMapping(value = "listaEntradas/conta/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public List<Entrada> obterEntradas(@PathVariable(value = "id") Integer idConta) {
		
        return entradaService.obterListaEntrada(idConta.longValue());
    }
	
	@ApiOperation(value = "Salvar 1(uma) ou mais Entradas para uma conta ")
	@GetMapping(value = "/salvarEntradas/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)	
	@RequestMapping(value = "salvarEntradas/{id}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public void salvarEntradas( @PathVariable(value = "id") Long idConta, @RequestBody(required = true) List<Entrada> entrada) {
        entradaService.salvarEAtualizar(entrada, idConta);
    }
	
	@ApiOperation(value = "Excluir Entrada ")
	@GetMapping(value = "/excluirEntrada/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)	
	@RequestMapping(value = "excluirEntrada/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public void excluirEntrada(@PathVariable(value = "id") Long idEntrada) {
		
		entradaService.excluirEntrada(idEntrada);
    }
	
}
