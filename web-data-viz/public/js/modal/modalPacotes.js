  function btnFecharModalPacotes() {
    let fecharModal = document.getElementById("modalPacotes");
    let bodyColor = document.getElementById("bodyBackground");
    let abrirEdicao = document.getElementById("telaEdicaoCliente");

    fecharModal.style.display = "none";

    if (abrirEdicao.style.display === "flex") {
      bodyColor.style.background = "#FFFFFF";
    } else {
      bodyColor.style.background = "linear-gradient(45deg, #999999, #FFFFFF)";
    }
  }

  function btnAbrirModalPacotes() {
    let fecharModal = document.getElementById("modalPacotes");
    let bodyColor = document.getElementById("bodyBackground");
    fecharModal.style.display = "flex";
    bodyColor.style.background = "#fff";
  }
