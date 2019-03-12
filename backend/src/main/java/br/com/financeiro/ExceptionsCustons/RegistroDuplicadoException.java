package br.com.financeiro.ExceptionsCustons;

public class RegistroDuplicadoException extends Exception {

    private static final long serialVersionUID = 1L;

    public RegistroDuplicadoException(String msg){
        super(msg);
    }
}
