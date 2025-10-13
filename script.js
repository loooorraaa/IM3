console.log("Hello, CurrenSea!");

// API URL – falls du sie später für AJAX brauchst
const apiKey = "marcoola_f67c8e3675118d51f2bbe258f60d6eba";
const apiUrl = "https://api.exchangeratesapi.com.au/latest";

// Test-Request an PHP-Script (optional)
fetch('https://interaktivemedien3.laura-seger.ch/php/unload.php')
  .then(response => response.json())
  .then(data => {
    console.log("Unload data:", data);
  })
  .catch(error => {
    console.error('Error fetching exchange rates:', error);
  });

// Hauptlogik für Währungsauswahl
document.addEventListener("DOMContentLoaded", function () {
  const currencyItems = document.querySelectorAll(".currency-list div");

  currencyItems.forEach(item => {
    item.addEventListener("click", () => {
      const currencyCode = item.dataset.currency;

      if (!currencyCode) {
        console.warn("Kein data-currency Attribut gefunden!");
        return;
      }

      console.log("Selected currency:", currencyCode);

      // Auswahl speichern und weiterleiten
      localStorage.setItem("selectedCurrency", currencyCode);
      window.location.href = "währungsrechner.html"; // zweite Seite
    });
  });
});
