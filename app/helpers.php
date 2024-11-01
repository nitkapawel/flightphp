<?php

// Flight::map('create_full_url', function (string $route, array $params = []) {
//     if (count($params) > 0) {
//         return Flight::get('main_url') . Flight::getUrl($route, $params);
//     } else {
//         return Flight::get('main_url') . Flight::getUrl($route);
//     }
// });


Flight::before('start', function () {
    Flight::response()->header('X-Frame-Options', 'SAMEORIGIN');
    Flight::response()->header('X-XSS-Protection', '1; mode=block');
    Flight::response()->header('X-Content-Type-Options', 'nosniff');
    Flight::response()->header('Referrer-Policy', 'no-referrer-when-downgrade');
    Flight::response()->header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    Flight::response()->header('Permissions-Policy', 'geolocation=()');
});

?>