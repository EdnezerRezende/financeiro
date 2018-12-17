package br.com.financeiro.controllers;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;


@RestController
@Api(value = "Home", description = "home")
public class HomeController {
	
	@ApiOperation(value = "Pagina inicial")
	@GetMapping(value = "/lista", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)	
	@RequestMapping(value = "lista", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public String index() {
		System.out.println("Home");
		return "home";
	}
	
}
