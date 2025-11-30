  const ctxC = document
    .getElementById("rendaMensalChartConsultor")
    .getContext("2d");

  // Gradiente azul moderno
  const gradient = ctxC.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, "#4dc8ff"); // azul claro
  gradient.addColorStop(1, "#0066ff"); // azul forte

  const rendaMensalChartConsultor = new Chart(ctxC, {
    type: "bar",
    data: {
      labels: [
        "jan",
        "fev",
        "mar",
        "abr",
        "mai",
        "jun",
        "jul",
        "ago",
        "set",
        "out",
      ],
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
      layout: { padding: 10 },

      plugins: {
        title: {
          display: true,
          text: "Faturamento Mensal do Consultor",
          color: "#dceaff",
          font: {
            size: 20,
            weight: "bold",
          },
          padding: { bottom: 25 },
        },

        legend: {
          display: false,
        },

        tooltip: {
          backgroundColor: "#0d0f1a",
          titleColor: "#66cfff",
          bodyColor: "#fff",
          borderColor: "#1a75ff",
          borderWidth: 1.5,
          cornerRadius: 10,
          padding: 12,
          displayColors: false,
          shadowOffsetX: 2,
          shadowOffsetY: 2,
          shadowBlur: 8,
          shadowColor: "rgba(0,150,255,0.4)",
        },

        datalabels: {
          color: "#ffffff",
          anchor: "end",
          align: "top",
          font: {
            weight: "bold",
            size: 12,
          },
          offset: -2,
          formatter: (value) => `R$ ${value}k`,
        },
      },

      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: "#b8d4ff",
            font: { size: 12 },
            callback: (value) => `R$ ${value}k`,
          },
          grid: {
            color: "#444444",
            lineWidth: 1,
          },
        },
        x: {
          ticks: {
            color: "#b8d4ff",
            font: { size: 12 },
          },
          grid: { display: false },
        },
      },
    },

    plugins: [ChartDataLabels],
  });

