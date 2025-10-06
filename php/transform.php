<?php
// extract.php einbinden, liefert ein Array zurück
$data = require_once 'extract.php';

// Prüfen, ob Daten vorhanden sind
if (!is_array($data) || empty($data)) {
    throw new Exception('Keine Rohdaten erhalten oder Daten ungültig.');
}

// Transformation der Rohdaten in das gewünschte Format
$transformedData = [];
if (isset($data['rates']) && is_array($data['rates'])) {
    foreach ($data['rates'] as $currency => $rate) {
        $transformedData[] = [
            'name' => $currency,
            'timestamp' => date('Y-m-d H:i:s', $data['timestamp']),
            'rates' => (string)$rate // Dezimalzahlen als String übernehmen
        ];
    }
} else {
    throw new Exception('Keine Raten-Daten im Response.');
}

// Optional: $transformedData ausgeben oder weiterverarbeiten
// z.B. für load.php
// file_put_contents('transformedData.json', json_encode($transformedData, JSON_PRETTY_PRINT));

echo "Daten erfolgreich transformiert!\n";
print_r($transformedData);
?>
