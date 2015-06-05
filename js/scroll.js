window.Scroller = (function(){
		// usage:
		// new Scroller( $jquery_container, function(page){ return path_to_page });
		//
		var Scroller = function($container, options){
			var self = this;
			$container.empty();
			this.$container = $container;
			this.$el = $('<div class="scroller">').appendTo($container);
			this.options = options;
			this.scroll_el = options.scroll_el || window;
			this.spinner_url = options.spinner_url || g.c.LOADER_PATH;
			this.chunk = 0;
			this.last_chunk = false;
			this.dataPath = options.dataPath
			this.item_width = options.item_width || g.c.ITEM_WIDTH;
			this.item_margin = options.item_margin || g.c.ITEM_MARGIN;
			this.entry_c = 1;
			this.entry_i = 0;
			this.current_row = null;
			this.fetching = false;
			this.loader_threshold = 800;
			//this.listView = new infinity.ListView(this.$el, {
				//lazy: this.lazyLoader
			//});
			this.renderChunk();
			this.listen();

		};

		Scroller.prototype.listen = function(){
			this.updateScheduled = false;
			this.$loader = $(g.tmpl('spinner')(this)).insertAfter(this.$el);
			var self = this;
			$(this.scroll_el).off('scroll'); //reset preexisting handlers
			$(this.scroll_el).on( 'scroll', function(){
				if(!self.updateScheduled && self.$el.is(':visible')){
					setTimeout(function(){
						if(self.onScreen(self.$loader)) {
							self.renderChunk();
						}
						self.updateScheduled = false;
					}, 500);
					self.updateScheduled = true;
				}
			});
		};
		// lots of this copied from
		// http://airbnb.github.io/infinity/demo-on.html
		Scroller.prototype.lazyLoader = function(){
			var self = this;
			_.defer(function(){
				$(self).find('.preload').each(function(){
					var $ref = $(this);
					$ref.attr('src', $ref.attr('data-original'));
				});
			});
		};

		Scroller.prototype.onScreen = function($item){
			var viewportBottom = $(this.scroll_el).scrollTop() + 
														$(this.scroll_el).height();
			var diff = $item.offset().top - viewportBottom;
			return diff < this.loader_threshold;
		};

		Scroller.prototype.renderChunk = function(data){
			var self = this;
			this.withNextCollection( function(){
				_.each(self.collection, _.bind(self.renderEntry, self));
			});
		};
		Scroller.prototype.renderEntry = function(entry){
			this.$el.append(g.tmpl(this.options.template)(entry));
		};

		Scroller.prototype.withNextCollection = function(cb){
			this.getNextCollection(cb);
		};
		Scroller.prototype.getNextEntry = function(){
			var e = this.collection[this.entry_i++];
			return e;
		};

		Scroller.prototype.destroy = function(){
			this.listView.remove();
			this.clearLoader();
		};

		Scroller.prototype.clearLoader = function(){
			this.$loader.remove();
		};
		Scroller.prototype.onEndReached = function(){
			this.clearLoader();
		};

		Scroller.prototype.getNextCollection = function(cb){
			var self = this;
			this.fetching = true;
			if(this.last_chunk){
				return false;
			}
			$.ajax({
				url: this.dataPath(this.chunk++),
				success: function(data){
					self.fetching = false;
					self.collection = data;
					self.entry_c = data.length;
					self.entry_i = 0;
					cb();
				},
				error: function(){
					self.last_chunk = true;
					self.onEndReached();
				}
			});
		};
		return Scroller;
})()

