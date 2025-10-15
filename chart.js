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

  const colors = ["rgba(32, 80, 203, 1)", "rgba(110, 148, 229, 1)"];
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

  // ✅ Refresh Button: Reset everything
  document.getElementById("refreshBtn").addEventListener("click", async () => {
    // Reset UI
    document.getElementById("startDate").value = "";
    document.getElementById("endDate").value = "";
    document.getElementById("currency2").value = "";
    normalizeMode = true;
    document.getElementById("toggleNormalizeBtn").textContent = "Normalize: ON";

    // Optional: remove selected base currency from localStorage
    // localStorage.removeItem("selectedCurrency");

    // Destroy existing chart
    if (chart) {
      chart.destroy();
      chart = null;
    }

    // Reload data and render chart
    allData = [];
    await fetchAllData();
    renderChart();
  });

  document.getElementById("currency2").addEventListener("change", renderChart);
  document.getElementById("toggleNormalizeBtn").addEventListener("click", toggleNormalize);
});
