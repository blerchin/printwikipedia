$(function(){
	toc_scroll = new Scroller($('#toc'), {
		dataPath: function(num){
			return "books/books_toc_web_" + num + ".json";
		},
		template: "book",
		itemWidth: g.c.ITEM_WIDTH
	});
	articles_scroll = new Scroller($('#articles'), {
		dataPath: function(num){
			return "books/books_full_web_" + num + ".json";
		},
		template: "book",
		itemWidth: g.c.ITEM_WIDTH
	});
});
