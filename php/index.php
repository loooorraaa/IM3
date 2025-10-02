<?php
$name = "Laura";
$alter = 22;
$groesse = 1.67;
$jahrgang = 2003;

$alter =2025 - $jahrgang;


// Bedingungen
if ($alter >= 18){
    echo "Du darfs Alkohol bestellen.";
} elseif ($alter >= 16) {
    echo "Du darfs Bier und Wein bestellen.";
} else {
    echo "Du darfs alkoholfreie Getränke bestellen.";
};

// Funktionen
function alterBerechnen($jahrgang) {
   $alter = 2025 - $jahrgang;
   return $alter; 
}

// oder direkt mit dem Date
function alterBerechnenAktuell($jahrgang) {
  return date("Y") - $jahrgang;
}

echo alterBerechnen(2020);

// Gemischte Funktion (wenn echo wird es ausgegeben, man kann auch return daraus machen) -> return ist besser
darfAlkoholBestellen($jahrgang);

function darfAlkoholBestellen($jahrgang) {
   if ($alter >= 18){
    return "Du darfs Alkohol bestellen.";
} elseif ($alter >= 16) {
    return "Du darfs Bier und Wein bestellen.";
} else {
    return "Du darfs alkoholfreie Getränke bestellen.";
};
}

// Array (schöne Schleifen programmieren)
$fruechte = array("Apfel", "Banane", "Orange");
echo $fruechte[1]; // Banane

?>