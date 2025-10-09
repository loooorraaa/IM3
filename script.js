console.log("Hello, World!");

API URL   $key = "marcoola_f67c8e3675118d51f2bbe258f60d6eba"; $url = "https://api.exchangeratesapi.com.au/latest";

fetch('https://interaktivemedien3.laura-seger.ch/php/unload.php')
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error fetching exchange rates:', error);
  });

  // Chart.js
  let myChart = document.querySelector('#myChart');
  const config = {
  type: 'line',
  data: data,
};

const labels = Utils.months({count: 7});
const data = {
  labels: labels,
  datasets: [{
    label: 'My First Dataset',
    data: [65, 59, 80, 81, 56, 55, 40],
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  }]
};



