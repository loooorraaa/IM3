<?php

require_once 'config.php';  

try {
    // Erstellt eine neue PDO-Verbindung
    // WICHTIG IMMER PDO VERWENDEN!!!!
    $pdo = new PDO($dsn, $username, $password, $options);



    $sql = "SELECT * FROM `User`";

    $stmt = $pdo->query($sql);

    $users = $stmt->fetchAll();



foreach ($users as $user) {
        echo $user['firstname'] . "<br>";
    }









    // foreach ($users as $user) {
    //     echo "ID: " . $user['id'] . " - Name: " . $user['name'] . "<br>";
    // }


} catch (PDOException $e) {
    // Fehlerbehandlung bei Verbindungsfehlern
    die("Datenbankverbindungsfehler: " . $e->getMessage());
}