jquery-percentwithinviewport
============================

A handy, tiny jQuery plugin to determine how far inside the viewport your elements are. **PercentWithinViewport** is a tiny 
(640b minified) plugin that you can call just once, or as many times within any event, to find all matching elements within 
the viewport and simultaneously grant them a data attribute representing a percentage of how far they are inside the viewport; 
and report back an array of all matching elements that are currently visible.

### Prerequisites

**PercentWithinViewport** requires jQuery. Download the plugin and make sure to include both in your HTML:

```html
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min.js?ver=2.0.2"></script>
<script type="text/javascript" src="jquery.vnm.percentWithinViewport.min.js"></script>
```

## Usage

It's as simple as:

```js
$('.element').percentWithinViewport();
```

This will find all matching elements with the class `.element` within the page and grant them a `data-percent-viewport`
attribute as an integer percentage of each that's within the viewport. It's important to note that it's how much of the 
_element_ that's inside the viewport, rather than how much of the _viewport_ that element is taking up. So, if exactly half 
of the element is within the viewport, `$('.element').percentWithinViewport()` would result in:

```html
<div class="element" data-percent-viewport="50">Half of me is visible. The other half is A MYSTERY.</div>
```

It will also return an array of jQuery-wrapped elements currently within the viewport (i.e. with a percentage greater 
than zero):

```js
var withinViewportArray = $('.element').percentWithinViewport();
//	Do something with withinViewportArray
```

## Parameters


 * `offsetTop` _(int)_ The amount of offset, in pixels, from the top of the viewport
 * `offsetTopElement` _(jQuery DOM element)_ Calculates the `outerHeight()` and uses that as the offset from the top of the viewport. Best used for fixed elements.
 * `offsetTop` _(int)_ The amount of offset, in pixels, from the bottom of the viewport.
 * `offsetBottomElement` _(jQuery DOM element)_ Calculates the `outerHeight()` and uses that as the offset from the bottom of the viewport. Best used for fixed elements.
 
 ### Returns

_(Array)_ An array of all matching elements that have more than 0% of themselves within the viewport. Will return an empty 
array if no elements matching conditions are found.

### Notes

The parameters are **cumulative**. So, if you have a header that is `100px` in height and set a top offset of `150px`, like so: 

```js
var elementsInViewport = $('.element').percentWithinViewport({
	'offsetTop': 150,
	'offsetTopElement': $('#header.height-100')
});
```

...then your total offset from the top of the viewport will be `250px`. 
 
 ## Example
 
 The following example is run on a `$(window).scroll()` event and returns an array of all visible `.percentage-box` elements. 
 The fixed-position `#header` is set as the `offsetTopElement`, so the viewport height is calculated accordingly.
 
 ```js
$(window).on('scroll', function(e) {
	var withinViewportArray = $('.percentage-box').percentWithinViewport({'offsetTopElement': $('#header')});
	
	$.each(withinViewportArray, function(index) {
		var myPercVisible = parseInt($(this).attr('data-percent-viewport'));
		$(this).css({'opacity': myPercVisible / 100});
		$(this).find('.percentage').text(myPercVisible + '%');
	});
}).trigger('scroll');
 ```
 
 Note that, if you don't need to know the figures constantly (or if it's too intensive), I would recommend looking at 
 [Ross Allen's scrollStop](https://github.com/ssorallen/jquery-scrollstop) instead of using the `$(window).scroll()` event.
 
 You can view a working example on [PercentWithinViewport's GitHub page](https://indextwo.github.io/jquery-percentwithinviewport/)
 
 ## Authors

* [Lawrie Malen](https://github.com/indextwo) at [Very New Media&trade;](http://www.verynewmedia.com)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details