function btnAbrirModalPacotes() {
    let modal = document.getElementById("modalPacotes");
    modal.style.display = "flex";
    
    setTimeout(() => {
        modal.classList.add("abrir");
    }, 10);
}

function btnFecharModalPacotes() {
    let modal = document.getElementById("modalPacotes");
    modal.classList.remove("abrir");

    setTimeout(() => {
        modal.style.display = "none";
    }, 600);
}

