"use strict";
( function(){

    $( function () {

        $.each( $('.products-cookies__items'), function () {

            new ProductsCookiesSlider( $(this) );

        } );

        $.each( $( '.shop' ), function() {

            new ShopHeight ( $( this ) );

        } );

    } );

    var ProductsCookiesSlider = function ( obj ) {

        var _self = this,
            _obj = obj,
            _window = $( window ),
            _slickInit = false,
            _slickSlider;

        var _addEvents = function () {

                _window.on( {
                    resize: function() {

                        if( _window.width() < 768 ) {

                            if( !_slickInit ) {

                                _initSlick();
                                _slickInit = true;

                            }


                        } else {

                            if( _slickInit ) {

                                _destroySlick();
                                _slickInit = false;
                            }

                        }


                    }
                } );

            },
            _initSlick = function() {

                _slickSlider = _obj.find('.slick-container').slick( {
                    dots: false
                } );

            },
            _destroySlick = function() {

                _slickSlider.slick('unslick');

            },
            _init = function() {
                _obj[0].obj = _self;
                _addEvents();

                if( _window.width() < 768 ) {

                    if( !_slickInit ) {

                        _initSlick();
                        _slickInit = true;
                    }

                }

            };

        _init();
    };

    var ShopHeight = function( obj ) {

        //private properties
        var _self = this,
            _obj = obj,
            _window = $(window),
            _header = $('.site__header'),
            _globalWidth = 0;

        //private methods
        var _addEvents = function() {

                _window.on( {
                    load: function () {

                        _globalWidth = _window.width();
                        _setHeight();

                    },
                    resize: function () {

                        if( _globalWidth != _window.width() ) {

                            _globalWidth = _window.width() + 1;

                            _setHeight();

                        }

                    }
                } );

            },
            _init = function() {
                _obj[ 0 ].obj = _self;
                _addEvents();
            },
            _setHeight = function() {

                var height = _window.height();

                _obj.css( {
                    'min-height': height - _header.innerHeight() - parseInt( _obj.css('padding-bottom') ) - parseInt( _obj.css('padding-top') ) - $('.site__main-title').outerHeight(true)
                } );

            };

        _init();
    };

} )();