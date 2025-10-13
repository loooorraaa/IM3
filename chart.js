// console.log("Hello, Chart.js!");



// document.addEventListener("DOMContentLoaded", async function () {
//   if (typeof Chart === "undefined") {
//     console.error("Chart.js library is not loaded.");
//     return;
//   }

//   const canvasEl = document.getElementById("currencyChart");
//   if (!canvasEl) {
//     console.error('Canvas #currencyChart nicht gefunden');
//     return;
//   }

//   const ctx = canvasEl.getContext("2d");
//   const currency2Select = document.getElementById("currency2");
//   const startDateInput = document.getElementById("startDate");
//   const endDateInput = document.getElementById("endDate");
//   const showRangeBtn = document.getElementById("showRangeBtn");
//   const refreshButton = document.getElementById("refreshBtn");

//   const selectedCurrency = localStorage.getItem("selectedCurrency");
//   if (!selectedCurrency) {
//     alert("Bitte zuerst eine Währung auf der Startseite auswählen.");
//     window.location.href = "index.html";
//     return;
//   }

//   let chart;

//   async function loadChartData(currency1, currency2 = "", startDate = "", endDate = "") {
//     const params = new URLSearchParams({
//       currency1,
//       currency2,
//       startDate,
//       endDate
//     });
//     // const fetchUrl = `php/get_currency_data.php?${params.toString()}`;
//     const fetchUrl = `php/unload.php`;
//     console.log('Fetching chart data from', fetchUrl);

//     try {
//       const response = await fetch(fetchUrl);
//       const data = await response.json();
//       console.log('get_currency_data response:', data);
//       unloadData(data);
//     } catch (error) {
//       alert(error.message);
//       return;
//     }

  
//   }

//   // Initial laden (letzter Tag)
//   loadChartData(selectedCurrency);

//   // Zeitraum anzeigen
//   showRangeBtn.addEventListener("click", () => {
//     loadChartData(
//       selectedCurrency,
//       currency2Select.value,
//       startDateInput.value,
//       endDateInput.value
//     );
//   });

//   // Refresh
//   refreshButton.addEventListener("click", () => {
//     startDateInput.value = "";
//     endDateInput.value = "";
//     currency2Select.value = "";
//     loadChartData(selectedCurrency);
//   });
// });

//   async function unloadData(data) {
//       console.log('Received data:', data);

//       if (!Array.isArray(data.currency1) || data.currency1.length === 0) {
//         console.warn('Keine Daten in currency1:', data.currency1);
//         // Render leeren Hinweis-Chart
//         if (chart) chart.destroy();
//         chart = new Chart(ctx, {
//           type: 'line',
//           data: { labels: ['keine daten'], datasets: [{ label: '-', data: [0] }] }
//         });
//         return;
//       }

//       const labels = data.currency1.map(d =>
//         new Date(d.time).toLocaleString("de-DE", {
//           day: "2-digit",
//           month: "2-digit",
//           hour: "2-digit",
//           minute: "2-digit"
//         })
//       );

//       const datasets = [
//         {
//           label: currency1,
//           data: data.currency1.map(d => d.rate),
//           borderColor: "blue",
//           fill: false,
//           tension: 0.2
//         }
//       ];

//       if (Array.isArray(data.currency2) && data.currency2.length > 0) {
//         datasets.push({
//           label: currency2,
//           data: data.currency2.map(d => d.rate),
//           borderColor: "red",
//           fill: false,
//           tension: 0.2
//         });
//       }

//       console.log('Labels:', labels);
//       console.log('Datasets:', datasets);

//       if (chart) chart.destroy();

//       chart = new Chart(ctx, {
//         type: "line",
//         data: { labels, datasets },
//         options: {
//           responsive: true,
//           scales: {
//             x: { title: { display: true, text: "Zeit" } },
//             y: { title: { display: true, text: "Kurs" } }
//           }
//         }
//       });
//     }

   // const labels = Utils.months({count: 7});








//      const ctx = document.getElementById("currencyChart");
// const data = {
//   labels: ["Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt"],
//   datasets: [{
//     label: 'My First Dataset',
//     data: [65, 59, 80, 81, 56, 55, 40],
//     fill: true,
//     borderColor: 'rgb(75, 192, 192)',
//     tension: 0.4
//   }]
// };

// const config = {
//   type: 'line',
//   data: data,
// };

// chart = new Chart(ctx, {
//         type: "line",
//         data: data,
//         options: {
//           responsive: true,
//           scales: {
//             x: { title: { display: true, text: "Zeit" } },
//             y: { title: { display: true, text: "Kurs" } }
//           }
//         }
//       });


const ctx = document.getElementById("currencyChart");
let chart;
let allData = [];
let normalizeMode = true; // start with normalization ON

// Fetch all data from unload.php
async function fetchAllData() {
  try {
    const res = await fetch('/php/unload.php');
    const data = await res.json();
    if (!Array.isArray(data)) throw new Error("Invalid JSON");
    allData = data;
    console.log("Loaded dataset:", allData);
  } catch (err) {
    console.error("Fehler beim Laden der Kursdaten:", err);
    alert("Fehler beim Laden der Kursdaten.");
  }
}

// Filter data for a specific currency between start and end date
function getCurrencyData(currency, startDate, endDate) {
  const filtered = allData.filter(item =>
    item.name === currency &&
    item.timestamp >= startDate &&
    item.timestamp <= endDate
  );

  const labels = [...new Set(filtered.map(f => f.timestamp.split(" ")[0]))].sort();

  const rates = labels.map(label => {
    const entry = filtered.find(f => f.timestamp.startsWith(label));
    return entry ? parseFloat(entry.rates) : null;
  });

  return { labels, rates };
}

// Normalize function (for % change)
function normalize(values) {
  const first = values.find(v => v !== null);
  if (!first) return values;
  return values.map(v => v !== null ? ((v / first) - 1) * 100 : null);
}

async function renderChart() {
  if (allData.length === 0) await fetchAllData();

  const startDate = document.getElementById("startDate").value || "2000-01-01";
  const endDate = document.getElementById("endDate").value || "2100-01-01";

  const baseCurrency = localStorage.getItem("selectedCurrency");
  const compareCurrency = document.getElementById("currency2").value || null;

  if (!baseCurrency) {
    alert("No base currency in localStorage");
    return;
  }

  const colors = ["rgb(75,192,192)", "rgb(192,75,75)"];
  const datasets = [];
  const allLabels = new Set();

  const makeDataset = (currency, color) => {
    const { labels, rates } = getCurrencyData(currency, startDate, endDate);
    const dataToPlot = normalizeMode ? normalize(rates) : rates;
    labels.forEach(l => allLabels.add(l));

    return {
      label: `${currency}${normalizeMode ? " (Δ%)" : ""}`,
      data: dataToPlot,
      borderColor: color,
      fill: false,
      tension: 0.4,
      meta: { originalRates: rates }
    };
  };

  // Base dataset
  datasets.push(makeDataset(baseCurrency, colors[0]));

  // Optional comparison dataset
  if (compareCurrency) {
    datasets.push(makeDataset(compareCurrency, colors[1]));
  }

  const sortedLabels = [...allLabels].sort();
  const chartData = { labels: sortedLabels, datasets };

  const yAxisTitle = normalizeMode ? "Change (%) from start" : "Exchange Rate";

  if (chart) {
    chart.data = chartData;
    chart.options.scales.y.title.text = yAxisTitle;
    chart.update();
  } else {
    chart = new Chart(ctx, {
      type: "line",
      data: chartData,
      options: {
        responsive: true,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                const ds = context.dataset;
                const idx = context.dataIndex;
                const rate = ds.meta.originalRates[idx];
                if (normalizeMode) {
                  const pct = context.parsed.y?.toFixed(2);
                  return `${ds.label}: ${pct}% (${rate})`;
                } else {
                  return `${ds.label}: ${rate}`;
                }
              },
              title: function (items) {
                return `Date: ${items[0].label}`;
              }
            }
          },
          legend: { labels: { color: "#222" } }
        },
        scales: {
          x: { title: { display: true, text: "Date" } },
          y: { title: { display: true, text: yAxisTitle } }
        }
      }
    });
  }
}

// Toggle normalization ON/OFF
function toggleNormalize() {
  normalizeMode = !normalizeMode;
  document.getElementById("toggleNormalizeBtn").textContent =
    `Normalize: ${normalizeMode ? "ON" : "OFF"}`;
  renderChart();
}

// Init
window.addEventListener("DOMContentLoaded", async () => {
  await fetchAllData();
  renderChart();

  document.getElementById("showRangeBtn").addEventListener("click", renderChart);
  document.getElementById("refreshBtn").addEventListener("click", renderChart);
  document.getElementById("currency2").addEventListener("change", renderChart);
  document.getElementById("toggleNormalizeBtn").addEventListener("click", toggleNormalize);
});
