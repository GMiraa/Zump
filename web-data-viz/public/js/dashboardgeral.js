    const menuNav = document.getElementById("menuNav");
    const abrir = document.getElementById("abrir_menu");

  
  function fecharMenu() {
    menuNav.style.transition = "1s ease-out";
    menuNav.style.width = "10px";
    conteudo_menu.style.opacity = "0";
    conteudo_menu.style.transition = "none";
    interagir_menu.style.transform = "Rotate(180deg)";

    setTimeout(() => {
      interagir_menu.style.opacity = 0;
    }, 340);
    interagir_menu.style.transition = ".6s";

    setTimeout(() => {
      abrir.style.display = "block";
      abrir.classList.add("animar");
      abrir.style.opacity = 1;
      interagir_menu.style.display = "none";
    }, 1000);
  }

  function abrirMenu() {
    menuNav.style.width = "100%";
    menuNav.style.transition = ".6s linear";

    interagir_menu.style.opacity = 1;
    interagir_menu.style.display = "block";
    abrir.classList.remove("animar");
    abrir.style.display = "none";
    interagir_menu.style.transform = "none";
    setTimeout(() => {
      conteudo_menu.style.opacity = "1";
      conteudo_menu.style.transition = ".5s linear";
    }, 850);
  }


 


  function atualizarHora() {
    const agora = new Date();

    const hora = agora.getHours().toString().padStart(2, "0");
    const minutos = agora.getMinutes().toString().padStart(2, "0");
    document.getElementById("hora").textContent = `${hora}:${minutos}`;

    const diasSemana = [
      "Domingo",
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
    ];
    const diaSemana = diasSemana[agora.getDay()];
    const dia = agora.getDate().toString().padStart(2, "0");
    const mes = agora.toLocaleString("pt-BR", { month: "short" });
    const ano = agora.getFullYear();

    document.getElementById(
      "data"
    ).textContent = `${diaSemana}, ${dia} ${mes} ${ano}`;
  }

  atualizarHora();
  setInterval(atualizarHora, 1000);