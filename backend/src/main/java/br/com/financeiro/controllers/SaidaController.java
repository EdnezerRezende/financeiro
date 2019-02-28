package br.com.financeiro.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import br.com.financeiro.models.Conta;
import br.com.financeiro.models.Entrada;
import br.com.financeiro.models.Saida;
import br.com.financeiro.service.EntradaService;
import br.com.financeiro.service.SaidaService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@Api(value = "Saida", description = "saida")
public class SaidaController {

	@Autowired
	private SaidaService saidaService;
	
	@ApiOperation(value = "Lista de Saida por conta ")
	@GetMapping(value = "/listaSaidas/conta/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)	
	@RequestMapping(value = "listaSaidas/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	@CrossOrigin
	public List<Saida> obterSaidas(@PathVariable(value = "id") Long idConta) {
		
        return saidaService.obterListaSaida(idConta);
    }

	@ApiOperation(value = "Lista de Saida por conta e referencia ")
	@GetMapping(value = "/listaSaidas/conta/{id}/referencia/{referencia}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	@RequestMapping(value = "listaSaidas/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	@CrossOrigin
	public List<Saida> obterSaidasPorReferencia(@PathVariable(value = "id") Long idConta,  @PathVariable(value = "referencia") String referencia) {

		return saidaService.obterListaSaidaReferencia(idConta, referencia);
	}
	
	@ApiOperation(value = "Salvar 1(uma) ou mais Saidas para uma conta ")
	@GetMapping(value = "/salvarSaidas/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)	
	@RequestMapping(value = "salvarSaidas/{id}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	@CrossOrigin
	public void salvarSaidas(@PathVariable(value = "id") Long idConta, @RequestBody(required = true) List<Saida> saida) {
		 
        saidaService.salvarEAtualizar(saida, idConta);
    }
	
	@ApiOperation(value = "Excluir Saida ")
	@GetMapping(value = "/excluirSaida/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)	
	@RequestMapping(value = "excluirSaida/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	@CrossOrigin
	public void excluirSaida(@PathVariable(value = "id") Long idSaida) {
		
		saidaService.excluirSaida(idSaida);
    }
	
}
