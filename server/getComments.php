<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit; // handle preflight request
}

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['username'])) {
    $username = $_GET['username'];
    $commentsFile = 'comments.json'; // Putanja do JSON fajla sa komentarima

    if (file_exists($commentsFile)) {
        $comments = json_decode(file_get_contents($commentsFile), true);
        $userComments = array_filter($comments, function($comment) use ($username) {
            return $comment['user'] === $username;
        });

        if (count($userComments) > 0) {
            http_response_code(200);
            echo json_encode(array_values($userComments));
        } else {
            http_response_code(200);
            echo json_encode(['message' => 'No comments found']);
        }
    } else {
        http_response_code(404);
        echo json_encode(['message' => 'Comments file not found']);
    }
} else {
    http_response_code(400);
    echo json_encode(['message' => 'Invalid request']);
}
