/* global jQuery:true */
/*
 * TrapTabKey
 * Based on https://github.com/gdkraus/accessible-modal-dialog/blob/master/modal-window.js
 * Copyright (c) 2016 Vasileios Mitsaras.
 * Licensed under MIT
 */

(function( w, $ ){
	"use strict";

	var name = "trab-tab",
		componentName = name + "-component";

	w.componentNamespace = w.componentNamespace || {};

	var TrapTabKey = w.componentNamespace.TrapTabKey = function( element,options ){
		if( !element ){
			throw new Error( "Element required to initialize object" );
		}
		// assign element for method events
		this.element = element;
		this.$element = $( element );
		// Options
		options = options || {};
		this.options = $.extend( {}, this.defaults, options );
	};


	TrapTabKey.prototype.init = function(){

		if ( this.$element.data( componentName ) ) {
			return;
		}

		this.$element.data( componentName, this );
	};

	TrapTabKey.prototype.bindTrap = function(){
		var self = this;

		this.$element
			.on( 'keydown.' + name, function( e ){
				self._trapTabKey(self.$element, e );
			} );
	};

	TrapTabKey.prototype.unbindTrap = function(){
		this.$element
			.off( 'keydown.' + name);
	};

	TrapTabKey.prototype.giveFocus = function(){
		var self = this,
			opts = self.options;

		// get list of all children elements in given object
		var o = self.$element.find('*'),
			focusEl = self.$element.find('[data-focus]');

		// set the focus to the first keyboard focusable item
		focusEl.length ? focusEl.first().focus() : o.filter(opts.focusableElementsString).filter(':visible').first().focus();

	};


	TrapTabKey.prototype._trapTabKey = function(obj, evt){
		var self = this,
			opts = self.options;

		// if tab or shift-tab pressed
		if (evt.which == 9) {

			// get list of all children elements in given object
			var o = obj.find('*');

			// get list of focusable items
			var focusableItems;
			focusableItems = o.filter(opts.focusableElementsString).filter(':visible');

			// get currently focused item
			var focusedItem;
			focusedItem = jQuery(':focus');

			// get the number of focusable items
			var numberOfFocusableItems;
			numberOfFocusableItems = focusableItems.length;

			// get the index of the currently focused item
			var focusedItemIndex;
			focusedItemIndex = focusableItems.index(focusedItem);

			if (evt.shiftKey) {
				//back tab
				// if focused on first item and user preses back-tab, go to the last focusable item
				if (focusedItemIndex == 0) {
					focusableItems.get(numberOfFocusableItems - 1).focus();
					evt.preventDefault();
				}

			} else {
				//forward tab
				// if focused on the last item and user preses tab, go to the first focusable item
				if (focusedItemIndex == numberOfFocusableItems - 1) {
					focusableItems.get(0).focus();
					evt.preventDefault();
				}
			}
		}

	};

	TrapTabKey.prototype.defaults = {
		focusableElementsString : "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]"
	};

	TrapTabKey.defaults = TrapTabKey.prototype.defaults;

})(this, jQuery);
