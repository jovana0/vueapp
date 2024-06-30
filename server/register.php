<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");


if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    
    if (isset($data['username']) && isset($data['email']) && isset($data['password'])) {
        $username = $data['username'];
        $email = $data['email'];
        $password = $data['password'];
        $role = 'User';

        $file = 'user.json';
        $users = [];

        if (file_exists($file)) {
            $users = json_decode(file_get_contents($file), true);
        }

        // Provera da li korisničko ime već postoji
        foreach ($users as $user) {
            if ($user['username'] === $username) {
                echo json_encode(['success' => false, 'message' => 'Username already exists']);
                exit();
            }
        }

        $newUser = [
            'id' => uniqid(),
            'username' => $username,
            'email' => $email,
            'password' => password_hash($password, PASSWORD_BCRYPT),
            'role' => $role
        ];

        $users[] = $newUser;
        file_put_contents($file, json_encode($users));

        echo json_encode(['success' => true, 'message' => 'User registered successfully','user' => $newUser]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid data']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>
