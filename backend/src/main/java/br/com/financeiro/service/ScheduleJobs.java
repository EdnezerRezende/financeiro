package br.com.financeiro.service;



import lombok.extern.java.Log;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

@Service
@Log
public class ScheduleJobs {

    //@Scheduled(cron = "0 */15 * * * *")
    public static void mantendoAplicacao() {
        try {
            URL url = new URL("https://gestaolaboratorio.herokuapp.com/api/categoria/listaCategoria");
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            InputStream content = connection.getInputStream();
            System.out.println("Mantendo ativa");

        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}
