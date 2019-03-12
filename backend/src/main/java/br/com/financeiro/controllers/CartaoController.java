package br.com.financeiro.controllers;

import br.com.financeiro.ExceptionsCustons.RegistroDuplicadoException;
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
@CrossOrigin
public class CartaoController {
	
	@Autowired
	private CartaoService cartaoService;

	@ApiOperation(value = "Lista de Cartões ")
	@GetMapping(value = "/listaCartoes/conta/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	@RequestMapping(value = "listaCartoes/conta/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public List<Cartao> obterCartoes(@PathVariable(value = "id") Long idConta) {
		
        return cartaoService.obterListaCartao(idConta);
    }
	
	@ApiOperation(value = "Salvar ou atualizar Cartão ")
	@GetMapping(value = "/salvarEAtualizarCartao/conta/{idConta}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	@RequestMapping(value = "salvarEAtualizarCartao/conta/{idConta}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	@CrossOrigin
	public void salvarEAtualizarCartao(@RequestBody(required = true) Cartao cartao, @PathVariable(value = "idConta") Long idConta) throws RegistroDuplicadoException {

		cartaoService.salvarEAtualizar(cartao, idConta);
    }
	
	@ApiOperation(value = "Excluir cartão ")
	@GetMapping(value = "/excluirCartao/{idCartao}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	@RequestMapping(value = "excluirCartao/{idCartao}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public void excluirConta(@PathVariable(value = "idCartao") Long idCartao) {

		cartaoService.excluirCartao(idCartao);
    }
	
	@ApiOperation(value = "Obter cartao por id")
	@GetMapping(value = "/obterCartao/{idCartao}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	@RequestMapping(value = "obterCartao/{idCartao}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public Cartao obterCartaoID(@PathVariable(value = "idCartao") Integer idCartao) {
		
        return cartaoService.obterCartaoById(idCartao.longValue());
    }
}
