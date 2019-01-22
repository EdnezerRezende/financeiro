package br.com.financeiro.controllers;

import br.com.financeiro.AppWebConfiguration;
import br.com.financeiro.models.Usuario;
import br.com.financeiro.security.jwt.TokenProvider;
import br.com.financeiro.service.UsuarioService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;

@RestController
@Api(value = "Auth", description = "login")
public class AuthController {
    private final UsuarioService userService;

    private final TokenProvider tokenProvider;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    public AuthController(PasswordEncoder passwordEncoder, UsuarioService userService,
                          TokenProvider tokenProvider, AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.tokenProvider = tokenProvider;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;

//        Usuario user = new Usuario();
//        user.setEmail("godoirezende@gmail.com");
//        user.setCpf("78671043134");
//        try {
//            this.userService.salvar(user);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
    }

    @GetMapping("/api/authenticate")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void authenticate() {
        // we don't have to do anything here
        // this is just a secure endpoint and the JWTFilter
        // validates the token
        // this service is called at startup of the app to check
        // if the jwt token is still valid
    }



//    @ApiOperation(value = "Logar usuário ")
//    @GetMapping(value = "/api/login", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
//    @RequestMapping(value = "/api/login", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @PostMapping("/api/login")
    @CrossOrigin
    public String authorize(@Valid @RequestBody Usuario loginUser,
                            HttpServletResponse response)  {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                loginUser.getUsername(), loginUser.getPassword());

        try {
            authenticationManager.authenticate(authenticationToken);
            return tokenProvider.createToken(loginUser.getUsername());
        } catch (AuthenticationException e) {
            AppWebConfiguration.logger.info("Security exception {}", e.getMessage());
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return null;
        }

    }

    @PostMapping("/api/signup")
    public String signup(@RequestBody Usuario signupUser) throws Exception {
        if (userService.usernameExists(signupUser.getUsername())) {
            return "EXISTS";
        }

        signupUser.encodePassword(passwordEncoder);
        userService.salvar(signupUser);
        return tokenProvider.createToken(signupUser.getUsername());
    }

    @PostMapping("/api/alterarSenha")
    public void alterarSenha(@RequestBody Usuario signupUser) throws Exception {
        if (userService.usernameExists(signupUser.getUsername())) {
            signupUser.encodePassword(passwordEncoder);
            userService.salvar(signupUser);
        } else {
            throw new Exception("Não existe o usuário informado");
        }
    }
}
