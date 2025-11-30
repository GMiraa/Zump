  function fecharEdicaoCliente() {
    let bodyColor = document.getElementById("bodyBackground");
    let fecharEdicao = document.getElementById("telaEdicaoCliente");
    fecharEdicao.style.display = "none";
    bodyColor.style.background = "linear-gradient(45deg, #999999, #FFFFFF)";
  }

  function abrirEdicaoCliente() {
    let bodyColor = document.getElementById("bodyBackground");
    let abrirEdicao = document.getElementById("telaEdicaoCliente");
    abrirEdicao.style.display = "flex";
    bodyColor.style.background = "#fff";
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
