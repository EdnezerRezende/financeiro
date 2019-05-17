package br.com.financeiro.controllers;

import br.com.financeiro.ExceptionsCustons.RegistroDuplicadoException;
import br.com.financeiro.models.Cartao;
import br.com.financeiro.models.FaturaCartao;
import br.com.financeiro.service.CartaoService;
import br.com.financeiro.service.FaturaCartaoService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Api(value = "Cartao", description = "cartao")
@CrossOrigin
public class FaturaCartaoController {
	
	@Autowired
	private FaturaCartaoService faturaCartaoService;

	@ApiOperation(value = "Lista de Fatura dos Cartões ")
	@GetMapping(value = "/listaFaturaCartoes/{idCartao}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	@RequestMapping(value = "listaFaturaCartoes/{idCartao}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public List<FaturaCartao> obterFaturaCartoes(@PathVariable(value = "idCartao") Long idCartao) {
		
        return faturaCartaoService.obterListaFaturaCartao(idCartao);
    }

}
