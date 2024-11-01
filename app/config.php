<?php

  use Smarty\Smarty;

  // Register Smarty as the view class
  // Also pass a callback function to configure Smarty on load
  Flight::register('view', Smarty::class, [], function (Smarty $smarty) {
    $smarty->setTemplateDir('./app/views/');
    $smarty->setCompileDir('./smarty/views_compiled/');
    $smarty->setConfigDir('./smarty/config/');
    $smarty->setCacheDir('./smarty/cache/');

    $MENU = array(
      array(
          "label" => "Nasz Zespół",
          "link" => "/nasz-zespol.html",
          "display" => "team",
          "target" => "",
          "rel" => "",
          "topMenu" => true,
          "submenu" => array(),
      ),
      array(
        "label" => "O nas",
        "link" => "/o-nas.html",
        "display" => "about",
        "target" => "",
        "rel" => "",
        "topMenu" => true,
        "submenu" => array(),
      ),
      array(
        "label" => "Fundacja",
        "link" => "/fundacja.html",
        "display" => "foundation",
        "target" => "",
        "rel" => "",
        "topMenu" => true,
        "submenu" => array(
          array(
            "label" => "O fundacji",
            "link" => "/fundacja/o-fundacji.html",
            "target" => "",
          )
        ),
      ),
      array(
        "label" => "Kontakt",
        "link" => "/kontakt.html",
        "display" => "contact",
        "target" => "",
        "rel" => "",
        "topMenu" => true,
        "submenu" => array(),
      ),
  );
    $smarty->assign('MENU', $MENU);
  });


?>