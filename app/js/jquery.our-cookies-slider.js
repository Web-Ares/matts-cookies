"use strict";
( function(){

    $( function () {

        $.each( $( '.our-cookies' ), function() {

            new OurCookiesSlider ( $( this ) );

        } );

    } );

    var OurCookiesSlider = function( obj ) {

        //private properties
        var _self = this,
            _obj = obj;

        //private methods
        var _init = function() {
                _obj[ 0 ].obj = _self;
                _initSlick();
            },
            _initSlick = function() {

                _obj.find('.slick-container').slick( {
                    dots: true,
                    autoplay: true,
                    autoplaySpeed: 10000
                } );

            };

        _init();
    };

} )();