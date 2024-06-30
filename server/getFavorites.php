<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit; // handle preflight request
}

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['userId'])) {
    $userId = $_GET['userId'];
    $favoritesFile = 'favorites.json'; // Putanja do JSON fajla sa omiljenim knjigama

    if (file_exists($favoritesFile)) {
        $favorites = json_decode(file_get_contents($favoritesFile), true);
        if (isset($favorites[$userId])) {
            $userFavorites = $favorites[$userId];
            http_response_code(200);
            echo json_encode($userFavorites);
        } else {
            http_response_code(200);
            echo json_encode(['message' => 'Favorites list is empty']);
        }
    } else {
        http_response_code(404);
        echo json_encode(['message' => 'Favorites file not found']);
    }
} else {
    http_response_code(400);
    echo json_encode(['message' => 'Invalid request']);
}
