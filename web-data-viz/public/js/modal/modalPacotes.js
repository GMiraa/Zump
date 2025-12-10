function btnAbrirModalPacotes(idCliente) {
    let modal = document.getElementById("modalPacotes");
    modal.style.display = "flex";

    idClienteSelecionado = idCliente;
    
    setTimeout(() => {
        modal.classList.add("abrir");
    }, 10);
    BuscarPacoteSCadastrados(idCliente);
}

function btnFecharModalPacotes() {
    let modal = document.getElementById("modalPacotes");
    modal.classList.remove("abrir");

    setTimeout(() => {
        modal.style.display = "none";
    }, 600);
}

