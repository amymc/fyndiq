var skateStore = (function(){

    var triggerBttn = $('#toggle'),
        overlay = $('.menu-overlay'),
        method = {},
        $overlay = $('.modal-overlay'),
        $modal = $('.modal'),
        $content = $('.content'),
        $close = $('.close'),
        $siteWrapper = $('.site-wrapper'),
        productNumber;


    function openMenu() {

        triggerBttn.click(toggleOverlay);

        function toggleOverlay() {
            if ($(overlay).hasClass('open')){
                $(overlay).removeClass('open');
                var over = $(overlay).addClass('closed');
                $(triggerBttn).removeClass('open');
                setTimeout(function() {
                    over.removeClass('closed');
                }, 400);
            }
            else{
                $(overlay).addClass('open');
                $(triggerBttn).addClass('open');
            }
        }        
    }


    function loadProducts() {

        $('.item').click(function(){
            productNumber = $(this).attr( 'id' );
            $.ajax({
                url: "./products/product"+productNumber+".html",
                cache: false,
                success: function(html){
                    openModal({content: $(html)});
                    //modal.open({content: $(html).filter('.product.'+ productNumber)});
                }
            });
        });
    }


    function openModal(settings){
        $content.empty().append(settings.content);
        $siteWrapper.addClass('fixed');
        $modal.addClass('show');
        $overlay.addClass('show');
        $close.click(closeModal);
    }


    function closeModal(){
        $siteWrapper.removeClass('fixed');
        $modal.removeClass('show');
        $overlay.removeClass('show');
        $content.empty();
    }


    function changeQuantity() {

        $(".modal").on("click", ".icon", function() {

            var $button = $(this);
            var oldValue = $button.parent().find("input").val();
            var newVal;

            if ($button.text() == "+") {
                var newVal = parseFloat(oldValue) + 1;
            } 
            else {
                // Don't allow decrementing below one
                if (oldValue > 1) {
                    newVal = parseFloat(oldValue) - 1;
                } 
                else {
                    newVal = 1;
                }
            }

            $button.parent().find("input").val(newVal);
        });
    }

    function openCart() {

        $('.site-container').click(function(event){
          toggleSidebar();
        });

        function toggleSidebar(){
            if ($('.site-container').hasClass('cart-details-open')){
                $('.site-container').removeClass('cart-details-open');
                $('.site-container').removeClass('animation-effect');
                $('.empty-msg').css('display', 'none');
                $('.simpleCart_items').css('display', 'block');
                $('.burger').removeClass('burger-hide');
            }
            else if ($(event.target).hasClass('cart-icon')){
                if(simpleCart.items().length == 0){
                    $('.empty-msg').css('display', 'block');
                    $('.simpleCart_items').css('display', 'none');
                    $('#cart-total').css('display', 'none');
                }
                else{
                    $('.empty-msg').css('display', 'none');
                    $('.simpleCart_items').css('display', 'block');
                    $('#cart-total').css('display', 'block');
                }
                $('.burger').addClass('burger-hide');
                $('.site-container').addClass('cart-details-open');
                $('.site-container').addClass('animation-effect');
            }
        }
    }

    simpleCart({
        checkout:{
            type: "PayPal",
            email: "you@yours.com"
        },
        cartStyle : "div",
        cartColumns: [
            { view: "image" , attr: "thumb", label: false },
            { attr: "name" , label: false } ,
            { attr: "quantity" , label: false },
            { view: function(item, column){return "x"} , label: false },
            { attr: "price" , label: false, view: 'currency' },
            { view: "remove" , text: "Remove" , label: false }
            ]
    });


    function isCartEmpty(){
        simpleCart.bind( 'update' , function( item ){
            if (simpleCart.grandTotal() === 0){
                $('.empty-msg').css('display', 'block');
                $('.simpleCart_items').css('display', 'none');
                $('#cart-total').css('display', 'none');
             } 
        });
    }

    return {
        openMenu: openMenu(),
        loadProducts: loadProducts(),
        changeQuantity: changeQuantity(),
        openCart: openCart(),
        simpleCart: simpleCart(),
        isCartEmpty: isCartEmpty()
    };
 
})();
