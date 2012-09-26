/**
 * selectbox - select styling plugin.
 * @author Samuel Mesquita <samuelmesq@gmail.com>
 * @version 0.1
 */

;(function( $, window, undefined ) {

	var pluginName = 'selectbox',
		document = window.document,
		defaults = {
			'spanClass': 'select',
			'spanClassInner': 'select-i'
		};

	function Plugin( element, options ) {
		
		this.element = element;

		this.options = $.extend({}, defaults, options );

		this._defaults 	= defaults;
		this._name 		= pluginName;

		this.init();
	}

	Plugin.prototype.init = function() {
		var $this = $(this.element),
			currentSelected = $this.find(':selected');
					
		$this.addClass('hidden')
			.wrap('<div class="selectbox">')
			.after('<span class="styleSelect ' + this.options.spanClass + '"><span class="styleSelectInner ' + this.options.spanClassInner + '">'
			+ currentSelected.text() + '</span></span>');

		var selectBoxSpan = $this.next(),
			selectBoxSpanInner = selectBoxSpan.find(':first-child');

		$this.change(function(){
			selectBoxSpanInner.html($this.find(':selected').text());//.parent().addClass('changed');
		});

		if ($this.prop("disabled")) {
			$this.prop("disabled", true).parent().find(".styleSelect").addClass("disabled");
		}

	};

	$.fn[pluginName] = function( options ) {

		return this.each(function() {

			if(!$.data(this, 'plugin_' + pluginName)){
				$.data(this, 'plugin_' + pluginName, new Plugin(this, options));
			}

		});
	}
})(jQuery, window);