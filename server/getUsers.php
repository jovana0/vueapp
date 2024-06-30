<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit; // Handle preflight requests
}

$usersFile = 'user.json';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($usersFile)) {
        echo file_get_contents($usersFile);
    } else {
        echo json_encode([]);
    }
}
?>
