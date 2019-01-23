package br.com.financeiro.controllers;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

import java.util.List;

import javax.annotation.security.RolesAllowed;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import br.com.financeiro.models.Usuario;
import br.com.financeiro.service.UsuarioService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@Api(value = "usuario")
@RestController
@RequestMapping("/api/usuario/")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @ApiOperation(value = "Salvar Usuários")
	@GetMapping(value = "/usuario/salvar", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)	
    @RequestMapping(value = "salvar", method = POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public void salvar(@RequestBody(required = true) Usuario usuario) throws Exception {
        usuarioService.salvar(usuario);
    }

    @ApiOperation(value = "Listar Usuários")
	@GetMapping(value = "/usuario/listaUsuarios", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)	
    @RequestMapping(value = "listaUsuarios", method = GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List<Usuario> listaUsuario() {

        return usuarioService.listaUsuarios();
    }

    @ApiOperation(value = "Usuário Logado")
	@GetMapping(value = "/usuario/usuarioLogado", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)	
    @RequestMapping(value = "usuarioLogado", method = POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @CrossOrigin
    public Usuario usuarioLogado(@RequestBody(required = true) String email) {

        return usuarioService.lookup(email);
    }

}
