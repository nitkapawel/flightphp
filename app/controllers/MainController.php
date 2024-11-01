<?php

namespace app\controllers;

use Flight;

class MainController {

    public static function view() {
        $context = [

            'pageTemplate' => 'main.tpl',
            'name' => 'main',
            'slider' => array(
                array(
                  'img' => '/images/banner_01.jpg',
                  'url' => '',
                  'id' => '',
                  'text' => '',
                  'subtitle' => '',
                )
              )
        ];
        Flight::view()->display('common/layout.tpl', $context);
    }
}

?>
