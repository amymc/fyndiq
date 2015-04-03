var modal = (function(){
	var 
	method = {},
	$overlay = $('.overlay'),
	$modal = $('.modal'),
	$content = $('.content'),
	$close = $('.close');

	// Center the modal in the viewport
	method.center = function () {
		var top, left;

		top = Math.max($(window).height() - $modal.outerHeight(), 0) / 2;
		left = Math.max($(window).width() - $modal.outerWidth(), 0) / 2;

		$modal.css({
			top:top + $(window).scrollTop(), 
			left:left + $(window).scrollLeft()
		});
	};

	// Open the modal
	method.open = function (settings) {
		$content.empty().append(settings.content);

		$modal.addClass('show');

		$modal.css({
			width: settings.width || 'auto', 
			height: settings.height || 'auto'
		});

		method.center();
		$(window).bind('resize.modal', method.center);
	};

	// Close the modal
	method.close = function () {
		$modal.removeClass('show');
		$content.empty();
		$(window).unbind('resize.modal');
	};

	$close.click(function(e){
		e.preventDefault();
		method.close();
	});

	return method;
}());


$(document).ready(function(){

	$('.item').click(function(e){
		var productNumber = $(this).attr( 'id' );

		$.ajax({
			url: "../products/product"+productNumber+".html",
			cache: false,
			success: function(html){
				modal.open({content: $(html)});
				//modal.open({content: $(html).filter('.product.'+ productNumber)});
			}
		});

		e.preventDefault();
	});

	
	simpleCart({
	    checkout: {
	      type: "PayPal",
	      email: "you@yours.com"
	    },
	    cartStyle : "table",
	      cartColumns: [
			    { attr: "name" , label: "Product" } ,
			    { attr: "price" , label: "Price", view: 'currency' } ,
			    { view: "decrement" , label: false , text: "-" } ,
			    { attr: "quantity" , label: "Qty" } ,
			    { view: "increment" , label: false , text: "+" } ,
			    { attr: "total" , label: "Total", view: 'currency' } ,
			    { view: "remove" , text: "Remove" , label: false }
			]
		});	

	var cartIcon = $('.cart-icon');
	var cartDetails = $('.cart-details');
	var storeItems = $('.store-items');

	$(cartIcon).click(function() {
		$(cartDetails).toggleClass('visible');
		if ($(window).width() < 800){ 
			$(storeItems).toggleClass('fixed');
		}
	});

});
