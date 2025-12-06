
const ctx = document.getElementById("rendaMensalChart").getContext("2d");

// 🔵 Variável global para armazenar o gráfico
let rendaMensalChart;

// Novo gradiente azul (renda total)
const gradientAtual = ctx.createLinearGradient(0, 0, 0, 400);
gradientAtual.addColorStop(0, "#1B98E0");
gradientAtual.addColorStop(1, "#1B98E0");

// Novo gradiente verde (crescimento %)
const gradientCrescimento = ctx.createLinearGradient(0, 0, 0, 400);
gradientCrescimento.addColorStop(0, "#92e0ff");
gradientCrescimento.addColorStop(1, "#92e0ff");

function criarGrafico() {
  // se já existir, destruir antes de recriar
  if (rendaMensalChart) rendaMensalChart.destroy();

  const isMobile = window.innerWidth < 450;

  rendaMensalChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["jun", "jul", "ago", "set"],
      datasets: [
        {
          label: "Renda total (R$ mil)",
          data: [25, 32, 40, 45],
          backgroundColor: gradientAtual,
          borderRadius: 0,
          hoverBackgroundColor: "#6CA3FF",
          yAxisID: "yRenda",
        },
        {
          label: "Crescimento (%)",
          data: [38, 28, 25, 33],
          backgroundColor: gradientCrescimento,
          borderRadius: 0,
          hoverBackgroundColor: "#7DFFBA",
          yAxisID: "yPercent",
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
          text: "📈 Renda mensal",
          color: "#000",
          font: {
            size: isMobile ? 14 : 20,
            weight: "bold",
          },
          padding: { bottom: isMobile ? 10 : 20 },
        },
        legend: {
          labels: {
            color: "#000",
            font: {
              size: isMobile ? 10 : 14,
            },
          },
        },
        tooltip: {
          backgroundColor: "#0D1117",
          titleColor: "#4F8BFF",
          bodyColor: "#E6E6E6",
          borderColor: "#4F8BFF",
          borderWidth: 1,
          cornerRadius: 8,
          padding: 10,
          callbacks: {
            title: (context) => `Mês: ${context[0].label}`,
            label: (context) => {
              if (context.dataset.label.includes("%")) {
                return `${context.dataset.label}: ${context.formattedValue}%`;
              } else {
                return `${context.dataset.label}: R$ ${context.formattedValue}K`;
              }
            },
          },
        },
        datalabels: {
          display: false,
          color: "#000",
          anchor: "end",
          align: "start",
          font: {
            weight: "bold",
            size: isMobile ? 10 : 14,
          },
        },
      },
      scales: {
        yRenda: {
          type: "linear",
          position: "left",
          beginAtZero: true,
          ticks: {
            color: "#000",
            font: {
              size: isMobile ? 10 : 15,
            },
            callback: (value) => `R$ ${value}k`,
          },
          grid: { color: "#494949", lineWidth: 1 },
        },
        yPercent: {
          type: "linear",
          position: "right",
          beginAtZero: true,
          ticks: {
            color: "#000",
            font: {
              size: isMobile ? 10 : 15,
            },
            callback: (value) => `${value}%`,
          },
          grid: { drawOnChartArea: false },
        },
        x: {
          ticks: {
            color: "#000",
            font: {
              size: isMobile ? 14 : 20,
            },
          },
          grid: { display: false },
        },
      },
    },
    plugins: [ChartDataLabels],
  });

}

criarGrafico();

// Recriando quando o tamanho da tela mudar
window.addEventListener("resize", criarGrafico);