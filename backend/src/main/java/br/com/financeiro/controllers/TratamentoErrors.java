package br.com.financeiro.controllers;

import br.com.financeiro.ExceptionsCustons.RegistroDuplicadoException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;


@ControllerAdvice
public class TratamentoErrors extends ResponseEntityExceptionHandler {


    @ExceptionHandler(value = { AuthenticationException.class, AccessDeniedException.class })
    protected ResponseEntity<Object> unauthorized(AuthenticationException ex, WebRequest request) {
        String bodyOfResponse = "Login ou senha inválidos";

        return handleExceptionInternal(ex, bodyOfResponse,
                new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }

    @ExceptionHandler(value = {RegistroDuplicadoException.class})
    protected ResponseEntity<Object> duplicate(RegistroDuplicadoException ex, WebRequest request) {
        String bodyOfResponse = "O Registro informado já existe na base";

        return handleExceptionInternal(ex, bodyOfResponse,
                new HttpHeaders(), HttpStatus.NOT_ACCEPTABLE, request);
    }
}
