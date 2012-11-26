/*
 * markup:
 * <div class="selectbox" id="test">
 *		<input type="hidden" name="test" />
 *		<span>Label</span>
 *		<ul>
 *			<li class="">first option</li>
 *			<li class="">second option</li>
 *		</ul>
 *	</div>
 *	
 */
;(function($, window, undefined){

	var pluginName = 'checkdown'
	,	document = window.document
	,	defaults = {
			'value': '',
			'beforeShow': function(){}
		};

	function Plugin( element, options ) {
		this.element 	= element;
		this.opts 		= $(this.element).find('li');
		this.input 		= $(this.element).find('input');
		this.label 		= $(this.element).find('span');
		
		this.options 	= $.extend({}, defaults, options);
		this._defaults 	= defaults;
		this._name 		= pluginName;

		this.init();
	}

	Plugin.prototype.init = function(){
		var obj = this
		,	options_lenght = obj.opts.length;

		if( options_lenght > 0 ){
			$(obj.element).removeClass('disabled');

			for(var i = 0; i < options_lenght; i++) {
				var opt = $(obj.opts[i]);
				if( opt.hasClass('selected') ){ obj.updateInputValue() }					
			}
		}

		this.initEvents();
	};

	Plugin.prototype.initEvents = function(){
		var obj = this
		,	ul 		= $(this.element).find('ul')
		,	options = this.opts

		// show options
		$(obj.element).live('click', function(e){
			var $this = $(this);
			$('.' + $(obj.element).attr('class')).removeClass('active');
			if( !$this.hasClass('disabled') ){
				obj.options.beforeShow();
				$this.removeClass('active').addClass('active');
			}

			return false;
		});

		$(document).click(function(){
			$(obj.element).removeClass('active');
		});

		// add option
		options.live('click', function(){
			var me = $(this);
			
			me.toggleClass('selected');

			if(!ul.hasClass('multiple'))
				ul.find('li').not(this).removeClass('selected');

			obj.updateInputValue();
		});

	};

	Plugin.prototype.updateInputValue = function() {
		var obj = this
		,	opts 	 = $(obj.element).find('li')
		,	temps    = {
			value : [],
			text  : []
		};

		for (var i = opts.length - 1; i >= 0; i--) {
			if ( $(opts[i]).hasClass('selected') ){
				temps.value.push( $(opts[i]).data('value'));
				(temps.text.length < 2 ) ? temps.text.push( $(opts[i]).text() ) : null;
			}
		};
		
		if( temps.value.length > 0 ) {
			$(obj.input).val(temps.value.toString()).change();
			$(obj.label).html(temps.text.toString());
		} else {
			$(obj.input).val( obj.options.value );
			$(obj.label).html('Selecione');
		}

	};

	$.fn[pluginName] = function( options ) {

		return this.each(function() {

			if(!$.data(this, 'plugin_' + pluginName)){
				$.data(this, 'plugin_' + pluginName, new Plugin(this, options));
			}

		});
	}

})(jQuery, this);