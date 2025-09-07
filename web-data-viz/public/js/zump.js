document.addEventListener("DOMContentLoaded", () =>{
    const loginForm = document.getElementById("login-form");
    const emailInput = document.getElementById("email");
    const senhaInput = document.getElementById("senha");
    const messageParagraph = document.getElementById("message");

    //escutando o email no formulário
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        messageParagraph.textContent = "";
        messageParagraph.className = "";

        const email = emailInput.value;
        const senha = senhaInput.value;

        const payload = {
            emailServer: email,
            senhaServer: senha
        };  

        try{
            const responde = await fetch('')
        }





    });

});