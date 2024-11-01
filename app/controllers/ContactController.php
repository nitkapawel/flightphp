<?php

namespace app\controllers;

use Flight;

class ContactController {

    public static function view() {
        $context = [
            'pageTemplate' => 'contact.tpl',
            'name' => 'kontakt',
        ];
        Flight::view()->display('common/layout.tpl', $context);
    }
}

?>
