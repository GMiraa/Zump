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

  const barra = document.createElement("div");
  barra.style.position = "absolute";
  barra.style.width = "0";
  barra.style.height = "3px";
  barra.style.backgroundColor = "white";
  barra.style.bottom = "-10px";
  barra.style.borderRadius = "3px";
  barra.style.transition = "width 0.3s ease";

  const homeSession = document.getElementById("home_session");
  const clientesSession = document.getElementById("clientes_session");
  const consultoresSession = document.getElementById("consultores_session");
  const dashboardSection = document.getElementById("dashboard_section");
  const clientesSection = document.getElementById("clientes_section");
  const consultoresSection = document.getElementById("consultores_section");

  [homeSession, clientesSession, consultoresSession].forEach((el) => {
    el.style.position = "relative";
    el.style.cursor = "pointer";
  });

  homeSession.appendChild(barra);
  dashboardSection.style.display = "flex";
  clientesSection.style.display = "none";
  consultoresSection.style.display = "none";

  function mudarSessao(ativo, sectionMostrar) {
    ativo.appendChild(barra);
    barra.style.width = "0";
    setTimeout(() => {
      barra.style.width = "40px";
    }, 10);
    document
      .querySelectorAll(".box_sessoes h2")
      .forEach((el) => el.classList.remove("active"));
    ativo.classList.add("active");
    dashboardSection.style.display = "none";
    clientesSection.style.display = "none";
    consultoresSection.style.display = "none";
    sectionMostrar.style.display = "flex";
  }

  homeSession.addEventListener("click", () =>
    mudarSessao(homeSession, dashboardSection)
  );
  clientesSession.addEventListener("click", () =>
    mudarSessao(clientesSession, clientesSection)
  );
  consultoresSession.addEventListener("click", () =>
    mudarSessao(consultoresSession, consultoresSection)
  );

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