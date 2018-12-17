package br.com.financeiro.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import br.com.financeiro.models.Conta;
import br.com.financeiro.models.Usuario;
import br.com.financeiro.service.ContaService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@Api(value = "Conta", description = "conta")
public class ContaController {
	
	@Autowired
	private ContaService contaService;

	@ApiOperation(value = "Lista de Contas ")
	@GetMapping(value = "/listaContas", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)	
	@RequestMapping(value = "listaContas", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public List<Conta> obterContas() {
		
        return contaService.obterListaConta();
    }
	
	@ApiOperation(value = "Salvar ou atualizar Conta ")
	@GetMapping(value = "/salvarEAtualizarConta/conta/{idConta}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)	
	@RequestMapping(value = "salvarEAtualizarConta/conta/{idConta}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public void salvarEAtualizarConta(@RequestBody(required = true) Conta conta, @PathVariable(value = "idConta") Long idConta) {
		
        contaService.salvarEAtualizar(conta, idConta);
    }
	
	@ApiOperation(value = "Incluir usuário na conta ")
	@GetMapping(value = "/IncluirUsuarioConta/conta/{idConta}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)	
	@RequestMapping(value = "incluirUsuarioConta/conta/{idConta}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public void incluirUsuarioConta(@RequestBody(required = true) Usuario usuario, @PathVariable(value = "idConta") Long idConta) {
		
        contaService.incluirUsuario(usuario, idConta);
    }
	
	@ApiOperation(value = "Excluir Conta ")
	@GetMapping(value = "/excluirConta/{idConta}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)	
	@RequestMapping(value = "excluirConta/{idConta}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public void excluirConta(@PathVariable(value = "idConta") Long idConta) {
		
        contaService.excluirConta(idConta);
    }
	
	@ApiOperation(value = "Obter Conta por id")
	@GetMapping(value = "/obterConta/{idConta}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)	
	@RequestMapping(value = "obterConta/{idConta}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public Optional<Conta> obterConta(@PathVariable(value = "idConta") Integer idConta) {
		
        return contaService.obterContaById(idConta.longValue());
    }
}
