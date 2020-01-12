(function() {
	$('.js-call-click').click(function() {
		ga('send', 'event', { eventCategory: 'clicktocall', eventAction: 'clicktocall', eventLabel:'clicktocall'});
	console.log('call');
	})

	$('.js-email-click').click(function() {
		ga('send', 'event', { eventCategory: 'clicktoemail', eventAction: 'clicktoemail', eventLabel: 'clicktoemail'});
	})

	$('.js-view').click(function(){
		var apartment = $(this).find('td').first().text();
		ga('send', 'event', { eventCategory: 'Floorplan', eventAction: 'View', eventLabel: apartment});
	})

	$('.js-download').click(function(){
		var apartment = $(this).find('td').first().text();
		ga('send', 'event', { eventCategory: 'Floorplan', eventAction: 'Download', eventLabel: apartment});
	})
})();


/////////////////////////////////////////////////////////////
//FIXED HEADER
/////////////////////////////////////////////////////////////
function fixedHeader(){
// Fixed Header
    var topOffset = $(window).scrollTop();
    if(topOffset > 350){
        $('body').addClass('fixed-header');
    }
    $(window).on('scroll', function(){
        var fromTop = $(this).scrollTop();
        if(fromTop > 350){
            $('body').addClass('fixed-header');
        }
        else{
            $('body').removeClass('fixed-header');
        }

    });
}
//fixedHeader();

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Header style
////////////////////////////////////////////////////////////////////////////////////////////////////////////
var elements = $('body').find('[data-headerstyle="dark"]'); // find the a children of the list items
var elArray = []; // create the empty aArray
for (var i=0; i < elements.length; i++) {
    var elChild = elements[i];
    var elID = $(elChild).attr('id');
    elArray.push(elID);
} // this for loop fills the elArray with attribute ID values

function headerStyle(){
    var windowPos = $(window).scrollTop(); // get the offset of the window from the top of page
    var windowHeight = $(window).height(); // get the height of the window
    var docHeight = $(document).height();
    var headerHeight = $('.header').outerHeight();

    for (var i=0; i < elArray.length; i++) {
        var theID = elArray[i];
        var divPos = $('#'+theID).offset().top; // get the offset of the div from the top of page
        var divHeight = $('#'+theID).outerHeight(); // get the height of the div in question

        if ( windowPos >= divPos - headerHeight - 10 && windowPos < (divPos + divHeight) ) {
            $('#'+theID).addClass('dark')
        } else {
            $('#'+theID).removeClass('dark')
        }

        if($('[data-headerstyle="dark"]').hasClass('dark')) {
            $('body').addClass('header-dark')
        } else {
            $('body').removeClass('header-dark')
        }
    }
};
headerStyle();

$(window).scroll(function(){
    headerStyle();

		if ($(this).scrollTop() > 0) {
        $('.scroll-down').fadeOut(750);
    } else {
        $('.scroll-down').fadeIn(750);
    }

    function elementScrolled(elem)
    {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();
        var elemTop = 0;
        return ((elemTop <= docViewBottom) && (elemTop >= docViewTop));
    }

    if (elementScrolled('#sec-8')) {
        var els = $('.c-parallax-headline'),
            i = 0,
            f = function () {
                $(els[i++]).addClass('active');
                if(i < els.length) setTimeout(f, 400);
            };
        f();
    } else {
			$('.c-parallax-headline').removeClass('active');
		}
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Elements height
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//function heightWithoutHeader(){
//    var windowHeight = $(window).height(); // get the height of the window
//    var headerHeight = $('.header').outerHeight(); // get the height of the window
//    $('.height-without-header').outerHeight( windowHeight - headerHeight);
//};
//heightWithoutHeader()
////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
//CUSTOM DROPDOWN
/////////////////////////////////////////////////////////////
/*
 HTML STRUCTURE:
 <div class="c-drop-holder" data-drop="holder">
 <a class="c-drop-trigger" data-drop="trigger">Trigger text</a>
 <div class="c-drop-content" data-drop="content">    </div>
 </div>
 */

//custom dropdown
$('body').on('click', '*[data-drop="trigger"]', function (e) {
    e.preventDefault();

    var $dropHolder = $(this).closest('[data-drop="holder"]');

    if ($dropHolder.hasClass('drop-open')) {
        $dropHolder.removeClass('drop-open');
    } else {
        $('[data-drop="holder"]').removeClass('drop-open');
        $dropHolder.addClass('drop-open');
    }
});

//custom dropdown close on click outside
$(document).click(function (e) {
    if (!($(e.target).is('[data-drop="holder"], [data-drop="holder"] *'))) {
        $('[data-drop="holder"]').removeClass('drop-open');
    }
});

/////////////////////////////////////////////////////////////
//CUSTOM CHECKBOXES
/////////////////////////////////////////////////////////////
/*
 HTML STRUCTURE:
 <div class="checkbox" data-checkbox="block">
 <input type="checkbox" id="someID" name="someNAME" value="1" checked="checked">
 <label for="someID" class="active">Some label text</label>
 </div>
 */
$('*[data-checkbox="block"] input').on("change", function () {
    $(this).siblings("label").toggleClass("active");
});

/////////////////////////////////////////////////////////////
//CUSTOM RADIO BUTTONS
/////////////////////////////////////////////////////////////
/*
 HTML STRUCTURE:
 <div class="radio-box" data-radio="block">
 <div>
 <input type="radio" name="some_name" value="some_value_1" id="radio1" checked>
 <label class="active" for="radio1">Radio button name 1</label>
 </div>
 <div>
 <input type="radio" name="some_name" value="some_value_2" id="radio2">
 <label for="radio2">Radio button name 2</label>
 </div>
 </div>
 */
$('*[data-radio="block"] input').on('change', function () {
    $(this).closest('[data-radio="block"]').find("label").removeClass("active");
    $(this).siblings("label").addClass("active");
});


/////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////
//IMAGE POSITIONING
/////////////////////////////////////////////////////////////
/*
 HTML STRUCTURE:
 <div class="ratiox-x" data-positioning="holder">
 <img data-positioning="img" src="<?php echo base_url('some-image...') ?>" alt=""/>
 </div>
 */

//image positioning
function imagePositioning() {
    $('*[data-positioning="img"]').delay(10).queue(function () {

        var image = $(this),
            imageHolder = $(this).closest('[data-positioning="holder"]');
        image.src = $(this).attr("src");
        var imageHeight = image.get(0).naturalHeight,
            imageWidth = image.get(0).naturalWidth,
            imageHolderHeight = imageHolder.height(),
            imageHolderWidth = imageHolder.width();

        var imgProp = imageHeight / imageWidth,
            imgHolderProp = imageHolderHeight / imageHolderWidth;

        image.addClass('cover-img');
        imageHolder.addClass('image-holder');

        if (imgProp > imgHolderProp) {
            $(this).addClass('align-width');
        } else {
            $(this).addClass('align-height');
        }
    });
};

/////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////
//SHOW/HIDE CONTENT (SLIDE)
/////////////////////////////////////////////////////////////
/*
 HTML STRUCTURE:
 <a data-slide-trigger="someNAME"></a>
 <div data-slide-content="someNAME"></div>
 */

//toggle slide
$('[data-slide-trigger]').on('click', function (e) {
    if ($(e.target).is('a')) {
        e.preventDefault();
    }
    var dataValue = ($(this).data('slide-trigger'));

    $('body').removeClass('menu-open');

    $.each($('*[data-slide-content]'), function(){
        if ($(this).data("slide-content") === dataValue) {
            $(this).slideToggle(200);
        } else {
            $(this).slideUp(200);
        }
    });


    if( ( $('.form-section').length ) && ( $('.form-section').height() == 0 ) || ( $('.availability-section ').length ) && ( $('.availability-section').height() == 0 ) ) {
        $('body').addClass('top-block-active');
    } else {
        $('body').removeClass('top-block-active');
    }

});

/////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////
//INPUT ANIMATIONS
/////////////////////////////////////////////////////////////
if (!String.prototype.trim) {
    (function() {
        // Make sure we trim BOM and NBSP
        var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        String.prototype.trim = function() {
            return this.replace(rtrim, '');
        };
    })();
}

[].slice.call( document.querySelectorAll( '.custom-input-holder input' ) ).forEach( function( inputEl ) {
    // in case the input is already filled..
    if( inputEl.value.trim() !== '' ) {
        classie.add( inputEl.parentNode, 'input--filled' );
    }

    // events:
    inputEl.addEventListener( 'focus', onInputFocus );
    inputEl.addEventListener( 'blur', onInputBlur );
} );

function onInputFocus( ev ) {
    classie.add( ev.target.parentNode, 'input--filled' );
}

function onInputBlur( ev ) {
    if( ev.target.value.trim() === '' ) {
        classie.remove( ev.target.parentNode, 'input--filled' );
    }
}
/////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////
//SELECT EFFECTS
/////////////////////////////////////////////////////////////
$('.c-select').on('focus', function(){
    $(this).closest('.custom-input-holder').addClass('input--filled');
});
$('.c-select').on('blur change', function(){
    $(this).closest('.custom-input-holder').addClass('input--filled');
    if(!($(this).val() == '')){
        $(this).closest('.custom-input-holder').addClass('input--filled');
    }else{
        $(this).closest('.custom-input-holder').removeClass('input--filled');
    }
});

$.each($('.c-select'), function(){
    if(!($(this).val() == '')){
        $(this).closest('.custom-input-holder').addClass('input--filled');
    }
});
/////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////
//BOKERAGE FIELDS
/////////////////////////////////////////////////////////////

if($('#broker_yes').is(':checked')) {
    $(".brokerage-fields").show();
}

$(".js-brokerage").on('change', function(){
    $(".brokerage-fields").slideToggle();
});

/////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////
//TEXT FADE OUT
/////////////////////////////////////////////////////////////

var timerForSliderText;
function sliderTextFadeOut(){
    clearTimeout(timerForSliderText);

    timerForSliderText = setTimeout(function() {
        $(".js-slider-text").fadeOut(750);
    }, 2750);
}
sliderTextFadeOut();

/////////////////////////////////////////////////////////////

if($('.js-form').length > 0) {
    $('.js-form').submit(function(e) {
        $('.js-form').prop('action', app.form).submit();
    });
}



//var resizeTimer;
//$(window).on('resize', function (e) {
//    clearTimeout(resizeTimer);
//    resizeTimer = setTimeout(function () {
//
//        heightWithoutHeader()
//
//    }, 100);
//});





$('#responsive-menu-button').on('click', function(){
    $('body').toggleClass('menu-open');
})


var insertImageTimer;
$('[data-image-src]').on('click', function(){
    var dataValue = ($(this).data('image-src'));
    var pdf = ($(this).data('pdf'));
    $('.js-availability-image-holder').empty();
    var apartment = $(this).data('apartment');
    var img = $('<img src="'+ dataValue +'">');
    var downloadLink = $('<a target="_blank" href="'+ pdf +'">Download</a>').click(function() {
    	console.log({ eventCategory: 'Floorplan', eventAction: 'Download', eventLabel: apartment});
		ga('send', 'event', { eventCategory: 'Floorplan', eventAction: 'Download', eventLabel: apartment});
	});
    img.appendTo('.js-availability-image-holder');
    downloadLink.appendTo('.js-availability-image-holder');

    clearTimeout(insertImageTimer);
    insertImageTimer = setTimeout(function () {
        $('.js-availability-image-holder').find('img').addClass('image-opacity');
    }, 100);

});

var stripCounter = 1;
$.each($('.main-sections-holder > .strip'), function(){
    if(stripCounter % 2 == 0) {
        $(this).addClass('left-text');
    }
    stripCounter++;
});

var poiLoader = (function () {
    var self = {
        map: null,
        markers: [],
        infoWindow: null
    };

    function clearMarkers() {
        for (var i = 0; i < self.markers.length; i++) {
            self.markers[i].setMap(null);
        }
        self.markers = [];
    }

    function set(data, type) {
   
    }

    var constructor = function PoiLoader(map) {
     
    };

    constructor.prototype.set = set;

    return constructor;
})();

function initialize() {


}

if(document.getElementById('map-canvas')) {
    google.maps.event.addDomListener(window, 'load', initialize);
}

if($('.js-form').length > 0) {
    $('.js-form').submit(function(e) {
        $('.js-form').prop('action', app.form).submit();
    });
}

if($('.divided-page').length) {
    $('body').addClass('dd-type');
}
