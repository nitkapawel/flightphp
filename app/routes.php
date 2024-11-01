<?php

// ROUTES
Flight::route('/', ['\app\controllers\MainController', 'view']);
Flight::route('/kontakt', ['\app\controllers\ContactController', 'view']);


?>