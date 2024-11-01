<section class="sliderCont dottedNav clearfix">
	
	<div class="slider-wrapper theme-default">
		<div id="slider" class="nivoSlider">
			{foreach from=$slider key=myid item=v name=slider} 
				<img alt="" height="" src="{$v.img}" title="#htmlcaption{$v.id}" width="">
			{/foreach}
		</div>
		
		
		{foreach from=$slider key=myid item=v name=slider} 
			<div id="htmlcaption{$v.id}" class="nivo-html-caption">
				<div class="itemDesc">
					<div class="container">
						<h2> 
							{if $v.url}
								<a href="{$v.url}">
							{/if}
								{$v.text}
								{if $v.subtitle}<small>{$v.subtitle}</small>{/if}
							{if $v.url}
									<br>
									<span class="button">Dowiedz się więcej</span>
								</a>
							{/if}
						</h2>
					</div>
				</div>
			</div>		 
		{/foreach}
	</div>
	
	<div class="mobileSliderCont">
		{foreach from=$slider key=myid item=v name=slider} 
			{if $v.url}
				<a href="{$v.url}" class="item">
					<span class="content">
						<span class="name">
							{if $v.text}
								{$v.text}
							{else if $v.subtitle}
								{$v.subtitle}
							{/if}
						</span>
						<span class="button">Sprawdź <i></i></span>
					</span>
					<img alt="" height="" src="{$v.img}" title="#htmlcaption{$v.id}" width="">
				</a>
			{/if}
		{/foreach}
	</div>

</section>

<script src="/js/jquery.nivo.slider.pack.js"></script>
<script>
var $slider = $('#slider');

$(function() {
    $slider.nivoSlider({
		effect: 'fade', // Specify sets like: 'fold,fade,sliceDown'
		slices: 15, // For slice animations
		boxCols: 8, // For box animations
		boxRows: 4, // For box animations
		animSpeed: 400, // Slide transition speed
		pauseTime: 8000, // How long each slide will show
		startSlide: 0, // Set starting Slide (0 index)
		directionNav: false, // Next & Prev navigation
		controlNav: true, // 1,2,3... navigation
		controlNavThumbs: false, // Use thumbnails for Control Nav
		pauseOnHover: false, // Stop animation while hovering
		manualAdvance: false, // Force manual transitions
		prevText: 'Prev', // Prev directionNav text
		nextText: 'Next', // Next directionNav text
		randomStart: false, // Start on a random slide
		beforeChange: function(){}, // Triggers before a slide transition
		afterChange: function(){}, // Triggers after a slide transition
		slideshowEnd: function(){}, // Triggers after all slides have been shown
		lastSlide: function(){}, // Triggers when last slide is shown
		afterLoad: function(){
			$(".nivo-controlNav").paroller({
				factor: 0.25,
				type: 'foreground',
				direction: 'vertical',
				transition: 'transform 0.2s linear'
			});
		} // Triggers when slider has loaded
	});
});

$slider.paroller({
	factor: 0.25,
	type: 'foreground',
	direction: 'vertical',
	transition: 'transform 0.2s linear'
});

</script>
<script src="/js/header-sticky.js" async defer></script>
<a name="start"></a>
