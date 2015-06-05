$(function(){
	$('.navbar-collapse li a').click(function(){
		$('.navbar-collapse').collapse('hide');
	});

	var onResize = function(){
		var scrollWidth = $(window).width();
		scrollWidth = scrollWidth - (scrollWidth % (g.c.ITEM_WIDTH + g.c.ITEM_MARGIN)) - g.c.ITEM_MARGIN;
		$('.pw-width').width(scrollWidth);
	};

	resizeScheduled = false;
	$(window).on('resize', function(){
		if(!resizeScheduled) { //debounce
			setTimeout(function(){
				onResize();
				resizeScheduled = false;
			}, 500);
			resizeScheduled = true;
		}
	});
	onResize();
});
