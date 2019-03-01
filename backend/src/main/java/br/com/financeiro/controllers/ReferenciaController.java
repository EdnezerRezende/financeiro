package br.com.financeiro.controllers;

import br.com.financeiro.models.Entrada;
import br.com.financeiro.models.Referencias;
import br.com.financeiro.models.Saida;
import br.com.financeiro.repository.ReferenciasRepository;
import br.com.financeiro.service.EntradaService;
import br.com.financeiro.service.ReferenciasService;
import br.com.financeiro.service.SaidaService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Api(value = "Entrada", description = "entrada")
public class ReferenciaController {

	@Autowired
	private ReferenciasService referenciasService;



	@ApiOperation(value = "Lista de Referencias por conta ")
	@GetMapping(value = "/listaReferencias/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	@RequestMapping(value = "listaReferencias/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	@CrossOrigin
	public List<Referencias> obterReferencias(@PathVariable(value = "id") Integer idConta) {
		
        return referenciasService.obterReferencias(idConta.longValue());
    }



	
}
