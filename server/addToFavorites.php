<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    
    if (isset($data['userId']) && isset($data['bookId'])) {
        $userId = $data['userId'];
        $bookId = $data['bookId'];

        $file = 'favorites.json';
        $favorites = [];

        if (file_exists($file)) {
            $favorites = json_decode(file_get_contents($file), true);
        }

        if (!isset($favorites[$userId])) {
            $favorites[$userId] = [];
        }

        if (!in_array($bookId, $favorites[$userId])) {
            $favorites[$userId][] = $bookId;
        }

        file_put_contents($file, json_encode($favorites));
        echo json_encode(['success' => true, 'message' => 'Book added to favorites']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid data']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>
