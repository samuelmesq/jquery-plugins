;(function($, window, undefined){

	var pluginName = 'checkdown',
		document = window.document,
		defaults = {
			'wrapperClass': 'selectbox'
		};

	function Plugin( element, options ) {
		this.element 	= element;
		this.opts 		= $(this.element).find('option');

		this.options 	= $.extend({}, defaults, options);
		this._defaults 	= defaults;
		this._name 		= pluginName;

		this.init();
	}

	Plugin.prototype.init = function(){
		var isSingle	= this.element.type == 'select-one';
		this.isMultiple = this.element.type == 'select-multiple';
		if( !isSingle && !this.isMultiple )
			console.log('element is not a select');

		this.buildMarkup();
		this.initEvents();

	};

	Plugin.prototype.buildMarkup = function(){
		var $this = $(this.element),
			currentSelected = $this.find(':selected'),
			list = document.createElement('ul');

		for( var i = 0, l = this.opts.length; i < l; i++ ){
			
			var li = document.createElement('li');
			$(li).text(this.opts[i].text);
			
			if(this.opts[i].selected)
				$(li).addClass('selected');

			list.appendChild(li);
		}

		$this.addClass('hidden')
			.wrap('<div class="'+ this.options.wrapperClass +'">')
			.after(list);

		this.container = $this.parent();
		this.container.prepend('<span>'+ currentSelected[0].text +'</span>');

		console.log('build - ok');
	};

	Plugin.prototype.initEvents = function(){
		var obj = this
		,	options = $(obj.container).find('li');

		this.container.on('hover', function(e){
			$(this).toggleClass('active');
			return false;
		});

		options.on('click', function(){
			var opt = $(this)
			,	option = $(obj.opts[opt.index()]);
				
			if(	!obj.isMultiple ){
				$(obj.container).find('li').removeClass('selected');				
				$(obj.element).find('option').attr('selected', false);
			}

			opt.toggleClass('selected');

			if(option.attr('selected'))
				option.attr('selected', false);
			else
				option.attr('selected', true);
		});

		console.log('events - ok');
	};

	$.fn[pluginName] = function( options ) {

		return this.each(function() {

			if(!$.data(this, 'plugin_' + pluginName)){
				$.data(this, 'plugin_' + pluginName, new Plugin(this, options));
			}

		});
	}

})(jQuery, this);