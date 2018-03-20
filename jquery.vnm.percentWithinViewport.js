///
//	jquery.vnm.percentWithinViewport
//	
//	Description:
//	A handy, tiny jQuery plugin to determine how far inside the viewport your elements are (vertical only, at the moment)
//
//	Example usages:
//	$('.element').percentWithinViewport();								//	All elements with .element class given `data-viewport-percent` attribute
//	var withinViewportArray = $('.element').percentWithinViewport();	//	As above, and returns array of elements that are within the viewport
//	
//	Version: 0.1.20180317
//	
//	Copyright (c) 2018 Lawrie Malen / Very New Media
//	Licensed under MIT license.
//	
//	Project Home Page:
//	http://indextwo.github.io/jquery-percentwithinviewport/
//	
//	GitHub repository:
//	https://github.com/indextwo/jquery-percentwithinviewport/
//	
//	Developed for & by Lawrie Malen @ Very New Media
//	http://www.verynewmedia.com
//	
///

(function ($) {
	$.fn.percentWithinViewport = function(options) {
		
		var settings = $.extend({
			offsetTop: 0,
			offsetTopElement: false,
			offsetBottom: 0,
			offsetBottomElement: false,
		}, options);
		
		var offsetTop = settings.offsetTop + ((settings.offsetTopElement !== false && settings.offsetTopElement.length > 0) ? settings.offsetTopElement.outerHeight() : 0);
		var offsetBottom = settings.offsetBottom + ((settings.offsetBottomElement !== false && settings.offsetBottomElement > 0) ? settings.offsetBottomElement.outerHeight() : 0);
		
		var viewportTop = $(window).scrollTop() + offsetTop;
		var viewportHeight = ($(window).height() - offsetTop) - offsetBottom;
		var viewportBottom = (viewportTop + viewportHeight);
		
		var visibleArray = [];
		
		this.each(function() {
			var elementTop = $(this).offset().top;
			var elementHeight = $(this).outerHeight();
			var elementBottom = elementTop + elementHeight;
			
			var totalHeight = Math.max(elementBottom, viewportBottom) - Math.min(elementTop, viewportTop);
			var heightDiff = totalHeight - viewportHeight;
			var elementInside = elementHeight - heightDiff;
			
			var percent = parseInt(elementInside <= 0 ? 0 : elementInside / elementHeight * 100);
			
			$(this).attr('data-percent-viewport', percent);
			
			if (percent > 0) {
				visibleArray.push($(this));
			}
		});
		
		return visibleArray;
	};
}(jQuery));