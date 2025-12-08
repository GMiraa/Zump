// sessão
function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    var boxButtons = document.getElementById("boxButtons");

    if (email != null && nome != null) {
        
        
    } else {
        
        window.location = "../login.html";

    }
}

async function limparSessao(id) {
    try {
        await fetch(`/usuarios/desativarUsuario/${id}`, {
            method: "POST" 
        });
        
    } catch (erro) {
        console.error("Erro ao fechar sessão no servidor:", erro);
    } finally {        
        sessionStorage.clear();
        window.location = "../login.html";
    }
}

// carregamento (loading)
function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "flex";
}

function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "none";

    var divErrosLogin = document.getElementById("div_erros_login");
    if (texto) {
        divErrosLogin.style.display = "flex";
        divErrosLogin.innerHTML = texto;
    }
}