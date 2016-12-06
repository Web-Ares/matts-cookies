"use strict";
( function(){

    $( function () {

        $.each( $('.products-cookies__items'), function () {

            new ProductsCookiesSlider( $(this) );
            new NamesHeights( $(this) );

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

    var NamesHeights = function ( obj ) {

        var _self = this,
            _obj = obj,
            _window = $( window ),
            _slides = _obj.find('.products-cookies__item'),
            _mass = [],
            _position = 0,
            _height = 0;

        var _addEvents = function () {

                _window.on( {
                    load: function() {

                        if( _window.width() >= 768 ) {

                            _setHeight();

                        }

                    },
                    resize: function() {

                        if( _window.width() >= 768 ) {

                            _setHeight();


                        } else {

                            _slides.find('.products-cookies__name').css( {
                                height: ''
                            } );

                        }


                    }
                } );

            },
            _setHeight = function() {

                _slides.each( function() {

                    var slide = $(this),
                        positionCurrent = slide.offset().top;

                    if( slide.parent().index() > 0 ) {

                        if( positionCurrent == _position ) {

                            _mass.push( slide.find('.products-cookies__name').height() )

                        }
                        else {

                            var max = Math.max.apply(null, _mass);

                            _slides.each( function() {

                                var slide1 = $(this);

                                if( slide1.offset().top == _position ) {

                                    slide1.find('.products-cookies__name').height( max );

                                }

                            } );

                            _position = slide.offset().top;
                            _mass = [];
                            _mass.push( slide.find('.products-cookies__name').height() );

                        }

                        if( slide.parent().index() == _slides.length - 1 ) {

                            var max = Math.max.apply(null, _mass);

                            _slides.each( function() {

                                var slide1 = $(this);

                                if( slide1.offset().top == _position ) {

                                    slide1.find('.products-cookies__name').height( max );

                                }

                            } );

                        }

                    } else if( slide.parent().index() == 0 ) {

                        _position = slide.offset().top;

                        _mass.push( slide.find('.products-cookies__name').height() );

                    }


                } );

            },
            _init = function() {
                _obj[0].obj = _self;
                _addEvents();

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