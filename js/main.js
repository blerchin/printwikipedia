$(function(){
	$('.navbar-collapse li a').click(function(){
		$('.navbar-collapse').collapse('hide');
	});

	//switch in special character for Wikipedia.
	var html = document.documentElement.innerHTML.replace(/(Wikipedia)/g, '&#xe02fikipedia');
	document.documentElement.innerHTML = html;

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
