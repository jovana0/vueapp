<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit; // handle preflight request
}

$filePath = 'comments.json';
if (!file_exists($filePath)) {
    file_put_contents($filePath, json_encode([]));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = file_get_contents('php://input');
    $comment = json_decode($input, true);

    if (json_last_error() !== JSON_ERROR_NONE) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid JSON']);
        exit;
    }

    $comments = json_decode(file_get_contents($filePath), true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to read comments']);
        exit;
    }

    $comments[] = $comment;

    if (file_put_contents($filePath, json_encode($comments, JSON_PRETTY_PRINT)) === false) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to save comment']);
        exit;
    }

    http_response_code(201);
    echo json_encode(['message' => 'Comment added successfully']);
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    header('Content-Type: application/json');

    if (isset($_GET['bookId'])) {
        $bookId = $_GET['bookId'];
        $comments = json_decode(file_get_contents($filePath), true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to read comments']);
            exit;
        }

        $bookComments = array_filter($comments, function($comment) use ($bookId) {
            return $comment['bookId'] == $bookId;
        });

        http_response_code(200);
        echo json_encode(array_values($bookComments));
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid book ID']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
?>

