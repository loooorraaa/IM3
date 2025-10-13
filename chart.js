document.addEventListener("DOMContentLoaded", function () {
  const ctx = document.getElementById("currencyChart").getContext("2d");
  const currency2Select = document.getElementById("currency2");
  const startDateInput = document.getElementById("startDate");
  const endDateInput = document.getElementById("endDate");
  const showRangeBtn = document.getElementById("showRangeBtn");
  const refreshButton = document.getElementById("refreshBtn");

  const selectedCurrency = localStorage.getItem("selectedCurrency");
  if (!selectedCurrency) {
    alert("Bitte zuerst eine Währung auf der Startseite auswählen.");
    window.location.href = "index.html";
    return;
  }

  let chart;

  async function loadChartData(currency1, currency2 = "", startDate = "", endDate = "") {
    const params = new URLSearchParams({
      currency1,
      currency2,
      startDate,
      endDate
    });
    const response = await fetch(`/php/get_currency_data.php?${params.toString()}`);
    const data = await response.json();

    if (data.error) {
      alert(data.error);
      return;
    }

    const labels = data.currency1.map(d =>
      new Date(d.time).toLocaleString("de-DE", {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      })
    );

    const datasets = [
      {
        label: currency1,
        data: data.currency1.map(d => d.rate),
        borderColor: "blue",
        fill: false,
        tension: 0.2
      }
    ];

    if (data.currency2.length > 0) {
      datasets.push({
        label: currency2,
        data: data.currency2.map(d => d.rate),
        borderColor: "red",
        fill: false,
        tension: 0.2
      });
    }

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
      type: "line",
      data: { labels, datasets },
      options: {
        responsive: true,
        scales: {
          x: { title: { display: true, text: "Zeit" } },
          y: { title: { display: true, text: "Kurs" } }
        }
      }
    });
  }

  // Initial laden (letzter Tag)
  loadChartData(selectedCurrency);

  // Zeitraum anzeigen
  showRangeBtn.addEventListener("click", () => {
    loadChartData(
      selectedCurrency,
      currency2Select.value,
      startDateInput.value,
      endDateInput.value
    );
  });

  // Refresh
  refreshButton.addEventListener("click", () => {
    startDateInput.value = "";
    endDateInput.value = "";
    currency2Select.value = "";
    loadChartData(selectedCurrency);
  });
});
