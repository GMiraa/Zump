package travel.we;

public enum Acao{
    CADASTRO_USUARIO(1), ALTERACAO_CONTA(2), CADASTRO_CLIENTE(3),
    ALTERACAO_CLIENTE(4), LOGIN(5),LOGOUT(6)
    ;
    // essas sao as constates da enum, ou seja, os valores que uma instancia dessa enum pode ter
    // dentro dos () estao os valores/argumentos de cada constante

    public int codigo_acao; // atributo para representar o argumento

    // esse e o construtor dessa enum
    // toda vez que uma instancia e criada dessa enum todo o bloco desse metodo sera executado
    // ou seja, se eu criar uma instancia do Login: Acao a = Acao.LOGIN
    // ele ia ver o argumento do Login, 5, e ira passar por esse metodo construtor.
    // E entao a variavel codigo_acao vai ter esse valor
    Acao(int codigo){
        codigo_acao = codigo;
    }
    Integer buscarCodigo(){
        return codigo_acao;
    }
    // aqui serve para criar uma instancia atraves do numero de argumento
    // ou seja, inves de: Acao a = Acao.LOGIN
    // vai ser: Acao a = Acao.codigoAcao(argumento que eu enviar)

    public static Acao codigoAcao(int codigo_acao){
        if (validarCodigo(codigo_acao)){
            // para cada constante da enum ele cria essa variavel acao
            // : Acao.values() serve para atribuir o valor da constante(tipo LOGIN) para variavel acao
            // 1 volta: acao = Acao.CADASTRO_USUARIO
            // 2 volta: acao = Acao.ALTERACAO_CONTA
            for (Acao acao : Acao.values()){
                if (acao.buscarCodigo().equals(codigo_acao))
                    return acao;
            }
        }
        System.out.println("Codigo invalido!");
        return null;
    }
    // ternario basico para retornar se esse codigo e valido
    static Boolean validarCodigo(int codigo_acao){
        return codigo_acao < 0 ? Boolean.FALSE : Boolean.TRUE;
    }
}
