function adjustHeader() {

    // sticky menu - slider that stops when reaches bottom of the #header
    var $slider = $('#slider');
    var $headerCont = $('#headerCont');
    var headerHeight = $headerCont.outerHeight();

    var top = ((window.pageYOffset || document.scrollTop)  - (document.clientTop || 0)) || 0;
    var sliderBottom = $slider.position().top + $slider.outerHeight(true);

    if(top + headerHeight > sliderBottom) {
        $headerCont.addClass('withBg');
    } else {
        $headerCont.removeClass('withBg');
    }

    /*
    console.log(parseInt($slider.css('transform').split(', ').slice(-1)[0].replace(/\D/gi, ''), 10));
    if(parseInt($slider.css('transform').split(', ').slice(-1)[0].replace(/\D/gi, ''), 10) > 81) {
        $('#headerCont').addClass('withBg');
//	    $slider.addClass('forcePosition');
    } else {
        $('#headerCont').removeClass('withBg');
//	    $slider.removeClass('forcePosition');
    }
    */
}

(function(){
    $(window).throttledBind("scroll", adjustHeader, 20);

    $(document).ready(adjustHeader);
    $(window).on('load', adjustHeader);
})();
