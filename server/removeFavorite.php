<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit; // handle preflight request
}

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON']);
    exit;
}

$userId = $data['userId'] ?? null;
$bookId = $data['bookId'] ?? null;

if (!$userId || !$bookId) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing userId or bookId']);
    exit;
}

$jsonFile = 'favorites.json';

if (!file_exists($jsonFile)) {
    http_response_code(500);
    echo json_encode(['error' => 'Favorites file not found']);
    exit;
}

$favorites = json_decode(file_get_contents($jsonFile), true);
if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to read favorites']);
    exit;
}

if (isset($favorites[$userId])) {
    $index = array_search($bookId, $favorites[$userId]);
    if ($index !== false) {
        array_splice($favorites[$userId], $index, 1);
        file_put_contents($jsonFile, json_encode($favorites, JSON_PRETTY_PRINT));
        echo json_encode(['message' => 'Book removed from favorites']);
    } else {
        echo json_encode(['message' => 'Book not found in favorites']);
    }
} else {
    echo json_encode(['message' => 'User not found']);
}
?>
