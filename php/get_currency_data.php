<?php
require_once 'mysql.php';
header('Content-Type: application/json');

$currency1 = $_GET['currency1'] ?? '';
$currency2 = $_GET['currency2'] ?? '';
$startDate = $_GET['startDate'] ?? '';
$endDate = $_GET['endDate'] ?? '';

if (!$currency1) {
    echo json_encode(['error' => 'No currency selected']);
    exit;
}

// Falls kein Datum angegeben, letzten Tag nehmen
if (!$startDate || !$endDate) {
    $stmt = $pdo->prepare("
        SELECT time, rate FROM rates
        WHERE currency = :currency1
          AND time >= NOW() - INTERVAL 1 DAY
        ORDER BY time ASC
    ");
    $stmt->execute(['currency1' => $currency1]);
    $data1 = $stmt->fetchAll(PDO::FETCH_ASSOC);
} else {
    $stmt = $pdo->prepare("
        SELECT time, rate FROM rates
        WHERE currency = :currency1
          AND time BETWEEN :startDate AND :endDate
        ORDER BY time ASC
    ");
    $stmt->execute([
        'currency1' => $currency1,
        'startDate' => $startDate . " 00:00:00",
        'endDate' => $endDate . " 23:59:59"
    ]);
    $data1 = $stmt->fetchAll(PDO::FETCH_ASSOC);
}

// Zweite Währung (optional)
$data2 = [];
if ($currency2) {
    $stmt2 = $pdo->prepare("
        SELECT time, rate FROM rates
        WHERE currency = :currency2
          AND time BETWEEN :startDate AND :endDate
        ORDER BY time ASC
    ");
    $stmt2->execute([
        'currency2' => $currency2,
        'startDate' => $startDate . " 00:00:00",
        'endDate' => $endDate . " 23:59:59"
    ]);
    $data2 = $stmt2->fetchAll(PDO::FETCH_ASSOC);
}

echo json_encode([
    'currency1' => $data1,
    'currency2' => $data2
]);
?>
