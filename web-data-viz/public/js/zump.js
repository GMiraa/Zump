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
        };  

        try{
            const responde = await fetch('../usuario/autenticar', {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            
            const data = await response.json();

            if(respose.ok){
                messageParagraph.textContent = "Login realizado com sucesso!";
                messageParagraph.classList.add("Sucesso!");
                console.log("Dados do usuário", data);
            }else{
                messageParagraph.textContent =  data.message || "Erro ao fazer o login";
                messageParagraph.classList.add("Error");
            }
        
        }catch (error){
            console.log("Erro na requisição:", error);
            messageParagraph.textContent = "Não foi possível conectar ao servidor. Tente novamente mais tarde."
            messageParagraph.classList.add(error);
        }

    });

});