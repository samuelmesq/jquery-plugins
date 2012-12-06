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
			defaultValue: '',
			defaultText : null,
			onBeforeShow: function(){},
			onAfterShow: function(){}
		};

	function Plugin( element, options ) {
		this.element 	= element;
		this.opts 		= $(this.element).find('li');
		this.input 		= $(this.element).find('input');
		this.label 		= $(this.element).find('span');
		
		this.options 	= $.extend({}, defaults, options);
		this.classes	= {
			checkdown : 'checkdown',
			active 	  : 'active',
			selected  : 'selected',
			disabled  : 'disabled',
			multiple  : 'multiple'
		},
		this._defaults 	= defaults;
		this._name 		= pluginName;

		this.init();
	}

	Plugin.prototype.init = function(){
		var obj = this
		,	optionsLength = obj.opts.length;

		this.options.defaultText = this.options.defaultText || this.label.text();

		$(obj.element).addClass(this.classes.checkdown);

		if( optionsLength > 0 ){
			for(var i = 0; i < optionsLength; i++) {
				var opt = $(obj.opts[i]);
				if( opt.hasClass(this.classes.selected) ){ obj.updateInputValue() }					
			}
		}
		
		this.initEvents();
	};

	Plugin.prototype.initEvents = function(){
		var obj   	= this
		,	ul 		= $(this.element).find('ul')
		,	options = this.opts

		// show options
		$(obj.element).live('click', function(e){
			var $this = $(this);

			$('.' + obj.classes.checkdown).removeClass(obj.classes.active);

			if( !$this.hasClass(obj.classes.disabled) && !$this.hasClass(obj.classes.active) ){
				$this.removeClass(obj.classes.active).addClass(obj.classes.active);
			}

			return false;
		});

		$(document).click(function(){
			$(obj.element).removeClass(obj.classes.active);
		});

		// add option
		options.live('click', function(){
			var me = $(this);
			me.toggleClass(obj.classes.selected);

			if(!ul.hasClass(obj.classes.multiple))
				ul.find('li').not(this).removeClass(obj.classes.selected);

			obj.updateInputValue();
		});

		return obj;
	};

	Plugin.prototype.updateInputValue = function() {
		var obj = this
		,	opts 	 = $(obj.element).find('li')
		,	temps    = {
			value : [],
			text  : []
		};

		for (var i = opts.length - 1; i >= 0; i--) {
			if ( $(opts[i]).hasClass(obj.classes.selected) ){
				temps.value.push( $(opts[i]).data('value'));
				(temps.text.length < 2 ) ? temps.text.push( $(opts[i]).text() ) : null;
			}
		};
		
		if( temps.value.length > 0 ) {
			$(obj.input).val(temps.value.toString()).change();
			$(obj.label).html(temps.text.toString());
		} else {
			$(obj.input).val( obj.options.defaultValue );
			$(obj.label).html(this.options.defaultText);
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