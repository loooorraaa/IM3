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

     const ctx = document.getElementById("currencyChart");
const data = {
  labels: ["Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt"],
  datasets: [{
    label: 'My First Dataset',
    data: [65, 59, 80, 81, 56, 55, 40],
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  }]
};

const config = {
  type: 'line',
  data: data,
};

chart = new Chart(ctx, {
        type: "line",
        data: data,
        options: {
          responsive: true,
          scales: {
            x: { title: { display: true, text: "Zeit" } },
            y: { title: { display: true, text: "Kurs" } }
          }
        }
      });