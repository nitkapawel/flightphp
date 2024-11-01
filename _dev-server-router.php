<?php

if (preg_match('/^(\/public\/)/', $_SERVER["REQUEST_URI"]) ) {
    return false;   // serve as it is
} else if (preg_match('/^(\/api\/)/', $_SERVER["REQUEST_URI"]) ) {
    include __DIR__ . DIRECTORY_SEPARATOR . 'public'.DIRECTORY_SEPARATOR.'api'. DIRECTORY_SEPARATOR .'index.php';
} else if (preg_match('/^(\/images\/)/', $_SERVER["REQUEST_URI"]) 
            || preg_match('/^(\/js\/)/', $_SERVER["REQUEST_URI"])) {
    // Serve files from the public/images directory
    $imagePath = __DIR__ . '/public' . $_SERVER["REQUEST_URI"]; // Build the path to the image file
    if (file_exists($imagePath)) {
        header('Content-Type: ' . mime_content_type($imagePath));
        readfile($imagePath); // Output the file
        exit; // Stop further execution
    }
} else if (preg_match('/^(\/css\/)/', $_SERVER["REQUEST_URI"])) {
    // Serve files from the public/css directory
    $cssPath = __DIR__ . '/public' . $_SERVER["REQUEST_URI"]; // Build the path to the CSS file
    if (file_exists($cssPath)) {
        header('Content-Type: text/css'); // Set Content-Type for CSS
        readfile($cssPath); // Output the file
        exit; // Stop further execution
    }
} else if (preg_match('/\.(?:png|jpg|jpeg|gif)$/', $_SERVER["REQUEST_URI"])) {
	return false; // Serve the requested resource as-is
} else {
    include __DIR__ . DIRECTORY_SEPARATOR . 'public/index.php';
}

?>
