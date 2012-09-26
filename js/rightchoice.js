/**
 * rightChoice - checkbox and radio button styling plugin.
 * @author Samuel Mesquita <samuelmesq@gmail.com>
 * @version 0.1
 */

;(function( $, window, undefined ) {

	var pluginName = 'rightChoice',
		document = window.document,
		defaults = {
			checkboxCls	: 'rc-checkbox',
			radioCls 	: 'rc-radio',
			checkedCls	: 'checked',
			selectedCls : 'selected',
			hideCls		: 'rc-hide'
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
			type = this.element.type,
			options = this.options,
			wrappers = {
				checkbox: '<div class="'+options.checkboxCls+'">',
				radio: '<div class="'+options.radioCls+'">'
			};

		//console.log($this.attr('type'));

		if( type == 'checkbox' ) {
			
			$this.addClass(options.hideCls).wrap(wrappers[type]).change( function() {
				if( $(this).is(':checked') ) { 
					$(this).parent().addClass(options.checkedCls); 
				} 
				else {	
					$(this).parent().removeClass(options.checkedCls); 	
				}
			});

			if( $this.is(':checked') ) {
				$this.parent().addClass(options.checkedCls);
			}

			if( $this.is(':disabled') ){
				$this.parent().addClass('disabled');
			}
		} 
		else if( type == 'radio') {

			$this.addClass(options.hideCls).wrap(wrappers[type]).change(function() {
				// radio button may contain groups! - so check for group
				$('input[name="'+$(this).attr('name')+'"]').each(function() {
					if( $(this).is(':checked') ) { 
						$(this).parent().addClass(options.selectedCls); 
					} else {
						$(this).parent().removeClass(options.selectedCls);
					}
				});
			});
			
			if( $this.is(':checked') ) {
				$this.parent().addClass(options.selectedCls);
			}

			if( $this.is(':disabled') ){
				$this.parent().addClass('disabled');
			}
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