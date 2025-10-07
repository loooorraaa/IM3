console.log("Hello, World!");

// API URL   $key = "marcoola_f67c8e3675118d51f2bbe258f60d6eba"; $url = "https://api.exchangeratesapi.com.au/latest";

fetch('https://interaktivemedien3.laura-seger.ch/php/unload.php')
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error fetching exchange rates:', error);
  });