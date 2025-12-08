  function gerarSenhaTemporaria() {
    let caracteres =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    let senha = "";
    for (let i = 0; i < 15; i++) {
      let indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      senha += caracteres.charAt(indiceAleatorio);
    }
    document.getElementById("senhaTemporariaConsultor").value = senha;
  }
  function abrirModalCadastroConsultor() {
    let modal = document.getElementById("modalCadastroConsultor");
    modal.style.display = "flex";
  }
  function fecharModalCadastroConsultor() {
    let modal = document.getElementById("modalCadastroConsultor");
    modal.style.display = "none";
    document.getElementById("nomeConsultor").value = "";
    document.getElementById("emailConsultor").value = "";
    document.getElementById("cpfConsultor").value = "";
    document.getElementById("dataNascConsultor").value = "";
    document.getElementById("telefoneConsultor").value = "";
    document.getElementById("enderecoConsultor").value = "";
    document.getElementById("cepConsultor").value = "";
    document.getElementById("numeroConsultor").value = "";
    document.getElementById("senhaTemporariaConsultor").value = "";
  }


   async function buscarCep() {
    const cep = document
      .getElementById("cepConsultor")
      .value.replace(/\D/g, "");

    if (cep.length !== 8) {
      return;
    }

    try {
      const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const dados = await resposta.json();

      if (dados.erro) {
        alert("CEP não encontrado!");
        return;
      }

      // Preenche SOMENTE o endereço
      document.getElementById("enderecoConsultor").value =
        dados.logradouro || "";
    } catch (erro) {
      alert("Erro ao buscar o CEP.");
      console.error("Erro CEP:", erro);
    }
  }

  function baixarPdf() {
    let nome = document.getElementById("nomeConsultor").value;
    let email = document.getElementById("emailConsultor").value;
    let cpf = document.getElementById("cpfConsultor").value;
    let dataNasc = document.getElementById("dataNascConsultor").value;
    let telefone = document.getElementById("telefoneConsultor").value;
    let endereco = document.getElementById("enderecoConsultor").value;
    let cep = document.getElementById("cepConsultor").value;
    let numero = document.getElementById("numeroConsultor").value;
    let senhaTemporaria = document.getElementById(
      "senhaTemporariaConsultor"
    ).value;

    const docDefinition = {
      content: [
        {
          text: "Cadastro de Consultor - ZUMP",
          style: "titulo",
        },

        {
          text: "Dados do Consultor",
          style: "subtitulo",
        },

        {
          style: "card",
          table: {
            widths: ["35%", "*"],
            body: [
              ["Nome:", nome],
              ["Email:", email],
              ["CPF:", cpf],
              ["Data de Nasc.:", dataNasc],
              ["Telefone:", telefone],
              ["Endereço:", endereco],
              ["CEP:", cep],
              ["Número:", numero],
              ["Senha Temporária:", senhaTemporaria],
            ],
          },
          layout: {
            fillColor: function (rowIndex, node, columnIndex) {
              return rowIndex % 2 === 0 ? "#F5F5F5" : null;
            },
            hLineColor: "#CCCCCC",
            vLineColor: "#CCCCCC",
          },
        },
      ],

      styles: {
        titulo: {
          fontSize: 22,
          bold: true,
          alignment: "center",
          margin: [0, 0, 0, 20],
        },
        subtitulo: {
          fontSize: 14,
          bold: true,
          color: "#444444",
          margin: [0, 0, 0, 10],
        },
        card: {
          margin: [0, 0, 0, 20],
        },
      },
    };

    if (
      !nome ||
      !email ||
      !cpf ||
      !dataNasc ||
      !telefone ||
      !endereco ||
      !cep ||
      !numero ||
      !senhaTemporaria
    ) {
      return;
    } else {
      pdfMake.createPdf(docDefinition).download(`Cadastro_${nome}.pdf`);
    }

    fecharModalCadastroConsultor();
  }

  function abrirComentario(botao) {
    const card = botao.closest(".card");
    const box = card.querySelector(".box_infosConsultor");

    const aberto = box.style.height === "300px";

    box.style.transition = "1s";
    box.style.height = aberto ? "70px" : "300px";
    box.style.overflowY = aberto ? "hidden" : "scroll";
  }


    function abrirModalEditarConsultor() {
    let modal = document.getElementById("modalEditConsultor");
    modal.style.display = "flex";
  }

  function fecharModalEditarConsultor() {
    let modal = document.getElementById("modalEditConsultor");
    modal.style.display = "none";
  }

