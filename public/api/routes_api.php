<?php
require __DIR__ .'/../../vendor-api/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$allowedOrigins = 'http://localhost:4200'; // Zmień na swój dozwolony adres

Flight::before('start', function() use ($allowedOrigins) {
    header("Access-Control-Allow-Origin: $allowedOrigins");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");

    // Obsługuje zapytania OPTIONS
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        http_response_code(204);
        exit;
    }
});

function generateToken($user) {
    $payload = [
        'id' => $user['id'],
        'username' => $user['username'],
        'role' => $user['role'], // Dodaj rolę użytkownika
        'iat' => time(),
        'exp' => time() + (60 * 60) // Token ważny przez godzinę
    ];

    return JWT::encode($payload, 'your_secret_key', 'HS256');
}

Flight::route('POST /login', function() {
    $db = Flight::db();
    $data = Flight::request()->data->getData();
    $username = $data['username'];
    $password = $data['password'];

    $stmt = $db->prepare("SELECT * FROM users WHERE username = :username");
    $stmt->bindParam(':username', $username);
    $stmt->execute();
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password'])) {
        // Generowanie JWT i zwrócenie tokenu
        $token = generateToken($user);
        Flight::json(['token' => $token]);
    } else {
        Flight::json(['error' => 'Invalid credentials'], 401);
    }
});


// admin only - sample endpoint
Flight::route('GET /admin', function() {
    Flight::authenticate(); // Sprawdz token JWT
    $user = Flight::get('user'); // Pobierz dane o użytkowniku

    if ($user['role'] !== 'admin') {
        Flight::json(['error' => 'Access denied'], 403);
        return;
    }

    // Dalsza logika dla administratora
    Flight::json(['message' => 'Welcome, admin']);
});


// public - sample endpoint
Flight::route('GET /test', function() {
    Flight::json(['message' => 'It works!']);
});

Flight::route('POST /upload-file', function(){
    // TODO: Add the logic for the uploaded files
    Flight::json([
        'success' => true,
        'files' => [
            [
                'url' => '/images/top_bg.jpg', // Full URL to the uploaded image
                'name' => 'my-image.png',         // Original filename
                'size' => 12345,                  // File size in bytes
                'type' => 'image/png'            // File MIME type
            ]
        ],
        'message' => 'File uploaded successfully'
    ]);
});

// Przykładowa trasa korzystająca z połączenia
// Flight::route('GET /users', function() {
//     $db = Flight::db();
//     $stmt = $db->query("SELECT * FROM users"); // Przykładowe zapytanie SQL
//     $results = $stmt->fetchAll();
//     Flight::json($results);
// });


