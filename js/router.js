var routes = {};

function route (path, templateName, controller) {
	routes[path] = {templateName: templateName, controller: controller};
}

route('/', 'list', function(){
	new Scroller($('#list-region'), {
		dataPath: function(num){
			return "books/books_full_web_" + num + ".json";
		},
		template: "book",
		itemWidth: g.c.ITEM_WIDTH
	});
});
route('/about', 'about', function(){
	$('#view').addClass('about');
});

route('/table-of-contents', 'list', function(){
	new Scroller($('#list-region'), {
		dataPath: function(num){
			return "books/books_toc_web_" + num + ".json";
		},
		template: "book",
		itemWidth: g.c.ITEM_WIDTH
	});
});

route('/articles', 'list', function(){
	new Scroller($('#list-region'), {
		dataPath: function(num){
			return "books/books_full_web_" + num + ".json";
		},
		template: "book",
		itemWidth: g.c.ITEM_WIDTH
	});
});

var el = null;
function router() {
	el = el || document.getElementById('view');
	var url = location.hash.slice(1) || '/';
	var route = routes[url];
	onRoute(url, route.templateName);
	if (el && route.controller) {
		el.innerHTML = g.tmpl(route.templateName)();
		el.setAttribute('class', 'container ' + route.templateName); 
		route.controller();
	}
}

function onRoute(url, name) {
	$('.navbar-nav li').removeClass('active');
	$('.navbar-nav li a').each(function($el){
		if ($(this).attr('href') === "#" + url) {
			$(this).parent().addClass('active');
		}
	});
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);

