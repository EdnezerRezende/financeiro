package br.com.financeiro.util;



import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class Datas {

    public static LocalDate obterDataAtualyyyyMMdd() {

        LocalDate hoje = LocalDate.now();
        DateTimeFormatter formatador =
                DateTimeFormatter.ofPattern("yyyy-dd-MM");
        hoje.format(formatador);

        return hoje;
    }
}
