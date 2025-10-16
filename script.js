console.log("Hello, script.js!");

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

// Hauptlogik für Karten & Währungen
document.addEventListener("DOMContentLoaded", function () {
  // Alle card-inner Elemente laden
  const cardInners = document.querySelectorAll(".card-inner");
  console.log("Gefundene card-inner Elemente:", cardInners);

  // Klick-Event für Mobile: Rückseite anzeigen
  cardInners.forEach(card => {
    card.addEventListener("click", () => {
      const front = card.querySelector(".card-front");
      // const back = card.querySelector(".card-back");

      // Toggle Sichtbarkeit: Front ausblenden, Back einblenden
      if (front.style.opacity !== "0") {
        front.style.opacity = "0";
        back.style.opacity = "1";
      } else {
        front.style.opacity = "1";
        back.style.opacity = "0";
      }
    });
  });

  // Währungselemente wie bisher
  const currencyItems = document.querySelectorAll(".currency-list div");

  currencyItems.forEach(item => {
    item.addEventListener("click", (event) => {
      const currencyCode = item.dataset.currency;

      if (!currencyCode) {
        console.warn("Kein data-currency Attribut gefunden!");
        return;
      }

      console.log("Selected currency:", currencyCode);

      // Auswahl speichern und weiterleiten
      localStorage.setItem("selectedCurrency", currencyCode);
      window.location.href = "währungsrechner.html"; // zweite Seite

      // Stoppe Propagation, damit Klick auf Währung nicht das Card-Toggle auslöst
      event.stopPropagation();
    });
  });
});


