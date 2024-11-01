<?php
ini_set('display_errors', 1);
error_reporting(E_ERROR | E_WARNING | E_PARSE);

require __DIR__ .'/../../vendor-api/autoload.php';
require __DIR__ .'/routes_api.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$JWTSecretKey = "TwojSekretJWT";

// Middleware do weryfikacji JWT
// Przykladowe uzycie: Flight::get('user')['role']
Flight::map('authenticate', function() {
    $headers = getallheaders();
    $authHeader = isset($headers['Authorization']) ? $headers['Authorization'] : '';

    if (strpos($authHeader, 'Bearer ') === 0) {
        $jwt = substr($authHeader, 7);

        try {
            // Dekodowanie tokenu i ustawienie zmiennych globalnych dla sesji
            $decoded = JWT::decode($jwt, new Key($JWTSecretKey, 'HS256'));
            Flight::set('user', [
                'id' => $decoded->id,
                'username' => $decoded->username,
                'role' => $decoded->role
            ]);
        } catch (Exception $e) {
            Flight::jsonHalt(['error' => 'Invalid token'], 401);
            exit();
        }
    } else {
        Flight::jsonHalt(['error' => 'No token provided'], 401);
        exit();
    }
});


// check if required role is the role that sits in JWT token
Flight::map('checkRole', function($requiredRole) {
    $headers = getallheaders();
    $authHeader = isset($headers['Authorization']) ? $headers['Authorization'] : '';

    if (strpos($authHeader, 'Bearer ') === 0) {
        $jwt = substr($authHeader, 7);

        try {
            $decoded = JWT::decode($jwt, new Key($JWTSecretKey, 'HS256'));
            if ($decoded->role !== $requiredRole) {
                Flight::jsonHalt(['error' => 'Forbidden'], 403);
            }
        } catch (Exception $e) {
            Flight::jsonHalt(['error' => 'Invalid token'], 401);
        }
    } else {
        Flight::jsonHalt(['error' => 'No token provided'], 401);
    }
});


// rejestracja klasy PDO Wrapper z konfiguracją bazy danych
Flight::register('db', \flight\database\PdoWrapper::class, [
    'mysql:host=localhost;dbname=id2it_www;charset=utf8',
    'admin', // nazwa użytkownika bazy danych
    'nitek99',   // hasło do bazy danych
    [
        PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES \'utf8mb4\'',
        PDO::ATTR_EMULATE_PREPARES => false,
        PDO::ATTR_STRINGIFY_FETCHES => false,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]
]);



// Przykładowa trasa korzystająca z połączenia
// Flight::route('GET /users', function() {
//     $db = Flight::db();
//     $stmt = $db->query("SELECT * FROM users"); // Przykładowe zapytanie SQL
//     $results = $stmt->fetchAll();
//     Flight::json($results);
// });


Flight::start();
