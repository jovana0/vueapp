<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    
    if (isset($data['username']) && isset($data['password'])) {
        $username = $data['username'];
        $password = $data['password'];

        $file = 'user.json';
        $users = [];

        if (file_exists($file)) {
            $users = json_decode(file_get_contents($file), true);
        }

        foreach ($users as $user) {
            if ($user['username'] === $username && password_verify($password, $user['password'])) {
                echo json_encode(['success' => true, 'user' => $user]);
                exit();
            }
        }

        echo json_encode(['success' => false, 'message' => 'Invalid username or password']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid data']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>
