<?php

  declare(strict_types=1);
  
  ini_set('display_errors', '1');
  error_reporting(E_ERROR | E_WARNING | E_PARSE);

  require __DIR__ .'/../vendor-app/autoload.php';

  // enable autoloading with namespaces
  if($_SERVER['SERVER_PORT'] == '3000' || $_SERVER['SERVER_PORT'] == '8899') { // for localhost
      Flight::path(__DIR__.'/../');
  } else {
      Flight::path(__DIR__);
  }
  


  require_once './app/config.php';
  require_once './app/helpers.php';
  require_once './app/routes.php';
  

  Flight::start();

?>