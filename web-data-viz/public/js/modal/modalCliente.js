  function fecharEdicaoCliente() {
    let fecharEdicao = document.getElementById("telaEdicaoCliente");
    fecharEdicao.style.display = "none";
  }

  function abrirEdicaoCliente() {;
    let abrirEdicao = document.getElementById("telaEdicaoCliente");
    abrirEdicao.style.display = "flex";
  }

    let cadastrarCli = document.getElementById("cadastrarCliente");

  function fecharCardDeCadastroCliente() {
    cadastrarCli.style.display = "none";
    nomeCliente.value = "";
    cpfCliente.value = "";
    dataNascCliente.value = "";
    telCliente.value = "";
    enderecoCliente.value = "";
  }

  function abrirCardDeCadastroCliente() {
    cadastrarCli.style.display = "flex";
  }
