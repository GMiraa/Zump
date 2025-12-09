const canvasC = document.getElementById("rendaMensalChartConsultor");
const ctxC = canvasC.getContext("2d");

// Variável global para recriar quando redimensionar
let rendaMensalChartConsultor;

function criarGraficoConsultor() {
  // destruir se já existir
  if (rendaMensalChartConsultor) rendaMensalChartConsultor.destroy();

  const isMobile = window.innerWidth < 450;

  // gradiente recriado sempre
  const gradient = ctxC.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, "#4dc8ff");
  gradient.addColorStop(1, "#0066ff");

  rendaMensalChartConsultor = new Chart(ctxC, {
    type: "bar",
    data: {
      labels: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out"],
      datasets: [
        {
          label: "Faturamento (R$ mil)",
          data: [12, 15, 20, 24, 18, 25, 32, 28, 35, 40],
          backgroundColor: gradient,
          borderWidth: 1.5,
          borderRadius: 10,
          hoverBackgroundColor: "#66d0ff",
          hoverBorderColor: "#99e0ff",
        },
      ],
    },

    options: {
      responsive: true,
      maintainAspectRatio: false,

      layout: {
        padding: isMobile
          ? { top: 10, bottom: 10, left: 5, right: 5 }
          : { top: 20, bottom: 20, left: 10, right: 10 },
      },

      plugins: {
        title: {
          display: true,
          text: "Faturamento Mensal do Consultor",
          color: "#dceaff",
          font: {
            size: isMobile ? 14 : 20,
            weight: "bold",
          },
          padding: { bottom: isMobile ? 10 : 25 },
        },

        legend: { display: false },

        tooltip: {
          backgroundColor: "#0d0f1a",
          titleColor: "#66cfff",
          bodyColor: "#fff",
          borderColor: "#1a75ff",
          borderWidth: 1.5,
          cornerRadius: 10,
          padding: 12,
          displayColors: false,
        },

        datalabels: {
          color: "#ffffff",
          anchor: "end",
          align: "top",
          offset: -2,
          font: {
            weight: "bold",
            size: isMobile ? 10 : 12,
          },
          formatter: (value) => `R$ ${value}k`,
        },
      },

      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: "#b8d4ff",
            font: { size: isMobile ? 10 : 12 },
            callback: (value) => `R$ ${value}k`,
          },
          grid: {
            color: "#444444",
          },
        },

        x: {
          ticks: {
            color: "#b8d4ff",
            font: { size: isMobile ? 10 : 12 },
          },
          grid: { display: false },
        },
      },
    },

    plugins: [ChartDataLabels],
  });
}

// cria ao carregar
criarGraficoConsultor();

// recria ao redimensionar
window.addEventListener("resize", criarGraficoConsultor);
