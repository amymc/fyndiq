var skateStore = (function(){

    var $triggerBttn = $('#toggle'),
        $menuOverlay = $('#menu-overlay'),
        $modalOverlay = $('#modal-overlay'),
        $modal = $('#modal'),
        $content = $('#content'),
        $modalClose = $('#modal .close'),
        $item = $('.item'),
        $itemRemove = $('.item-remove'),
        $outerWrapper = $('#wrapper-outer'),
        $siteContainer= $('#site-container'),
        $burger = $('#burger'),
        $emptyMsg = $('#empty-msg'),
        $cartItems = $('.simpleCart_items'),
        $cartTotal = $('#cart-total'),
        $cartButton = $('#cart-button'),
        $headerContainer = $('#header-container'),
        productNumber, newVal;


    function openMenu() {

        $triggerBttn.click(toggleOverlay);

        function toggleOverlay() {
            if ($menuOverlay.hasClass('open')){
                $menuOverlay.addClass('closed');
                setTimeout(function() {
                    //need to remove this so the text will animate 
                    //from the top the next time the menu is opened
                    $menuOverlay.removeClass('closed');
                }, 400);
            }
            $menuOverlay.toggleClass('open');
            $triggerBttn.toggleClass('open');
        }
    }


    function openModal() {

        $item.click(function(){
            $content.empty();
            productNumber = $(this).attr( 'id' );
            $.ajax({
                url: "./products/product"+productNumber+".html",
                cache: false,
                success: function(html){
                    $content.append(html);
                }
            });
        });

        $item.add($modalClose).click(function(){
            $outerWrapper.toggleClass('fixed');
            $modalOverlay.toggleClass('show');
            //delay the opening of the modal to allow time for the ajax content to load
            setTimeout(function() {
                $modal.toggleClass('show');
            }, 200);
        })

    }


    function changeQuantity() {

        $modal.on("click", ".icon", function() {

            var $button = $(this);
            var oldValue = $button.parent().find("input").val();

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

        $siteContainer.click(function(event){
            toggleSidebar();
        });

        function toggleSidebar(){
            if (($(event.target).hasClass('cart-icon')) || (($siteContainer.hasClass('cart-details-open')) && ($(event.target).parents('.site-wrapper').length || $(event.target).hasClass('close')))){
                $siteContainer.toggleClass('cart-details-open');
                $siteContainer.toggleClass('animation-effect');
                $burger.toggleClass('burger-hide');
                $('html').toggleClass('cart-details-open');
            }
        }
    }


    //initialise simplecart plugin
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
            ],

            //event callbacks
            afterAdd: animatePurchase,
            update: isCartEmpty
    });


    function isCartEmpty(){
        if (simpleCart.grandTotal() === 0){
            $emptyMsg.css('display', 'block');
            $cartItems.css('display', 'none');
            $cartTotal.css('display', 'none');
        }
         else{
            $emptyMsg.css('display', 'none');
            $cartItems.css('display', 'block');
            $cartTotal.css('display', 'block');
        }
    }


    function animatePurchase(){
        $cartButton.addClass('animation');
        setTimeout(function() {
            $modalClose.trigger( "click" );
            $cartButton.removeClass('animation');
        }, 1000);
    }
    

    function animateHeader(){
        $(window).scroll(function() {
           if ($( window ).width() >= 800){
                if (window.scrollY > 300) {
                    $headerContainer.addClass('shrink');
                }
                else {
                    $headerContainer.removeClass('shrink');
                }
            }
        });
    }


    return {
        openMenu: openMenu(),
        openModal: openModal(),
        changeQuantity: changeQuantity(),
        openCart: openCart(),
        animateHeader: animateHeader()
    };
 
})();
