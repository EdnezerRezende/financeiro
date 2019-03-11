package br.com.financeiro.controllers;

import br.com.financeiro.models.Cartao;
import br.com.financeiro.models.Conta;
import br.com.financeiro.models.Usuario;
import br.com.financeiro.service.CartaoService;
import br.com.financeiro.service.ContaService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@Api(value = "Conta", description = "conta")
public class CartaoController {
	
	@Autowired
	private CartaoService cartaoService;

	@ApiOperation(value = "Lista de Cartões ")
	@GetMapping(value = "/listaCartoes", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	@RequestMapping(value = "listaCartoes", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public List<Conta> obterContas() {
		
        return cartaoService.obterListaCartao();
    }
	
	@ApiOperation(value = "Salvar ou atualizar Conta ")
	@GetMapping(value = "/salvarEAtualizarConta/conta/{idConta}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)	
	@RequestMapping(value = "salvarEAtualizarConta/conta/{idConta}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public void salvarEAtualizarConta(@RequestBody(required = true) Cartao cartao, @PathVariable(value = "idConta") Long idConta) {

		cartaoService.salvarEAtualizar(cartao, idConta);
    }
	
	@ApiOperation(value = "Excluir cartão ")
	@GetMapping(value = "/excluirCartao/{idConta}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	@RequestMapping(value = "excluirCartao/{idConta}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public void excluirConta(@PathVariable(value = "idCartao") Long idCartao) {

		cartaoService.excluirCartao(idCartao);
    }
	
	@ApiOperation(value = "Obter Conta por id")
	@GetMapping(value = "/obterConta/{idConta}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)	
	@RequestMapping(value = "obterConta/{idConta}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public Optional<Conta> obterConta(@PathVariable(value = "idCartao") Integer idCartao) {
		
        return cartaoService.obterCartaoById(idCartao.longValue());
    }
}
