<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit; // Handle preflight requests
}

$input = file_get_contents('php://input');
$data = json_decode($input, true);

$usersFile = 'users.json';

if (!file_exists($usersFile)) {
    file_put_contents($usersFile, json_encode([]));
}

$users = json_decode(file_get_contents($usersFile), true);

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $userId = $data['id'];
    $users = array_filter($users, function ($user) use ($userId) {
        return $user['id'] !== $userId;
    });
    file_put_contents($usersFile, json_encode(array_values($users), JSON_PRETTY_PRINT));
    echo json_encode(['message' => 'User deleted']);
}
?>
