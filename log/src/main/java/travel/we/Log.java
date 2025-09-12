package travel.we;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.concurrent.ThreadLocalRandom;

public class Log {
    public static void main(String[] args) throws InterruptedException {
        LocalDateTime dtHoraAtual = LocalDateTime.now(); // pega a data e hora atual
        DateTimeFormatter dtHoraAtualFormatada = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        int codigo = ThreadLocalRandom.current().nextInt(1,6);
        Acao acao = Acao.codigoAcao(codigo); // to criando uma instancia da Enum com base no argumento de cada constante

        Boolean rodar = null;
        String texto =
                """
                [Data e hora: %s] - Codigo da acao: %d / Acao: %s
                """;
        while (rodar == null){
            int tempo = ThreadLocalRandom.current().nextInt(2000,6000);
            dtHoraAtual = LocalDateTime.now();
            codigo = ThreadLocalRandom.current().nextInt(1,6);
            acao = Acao.codigoAcao(codigo);
            System.out.print(texto.formatted(dtHoraAtual.format(dtHoraAtualFormatada), codigo, acao));
            Thread.sleep(tempo); // serve para 'pausar' o codigo, a variavel tempo contem o valor em milisegundos que sera pausado
        }
    }
}
