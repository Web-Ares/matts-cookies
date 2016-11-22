"use strict";
( function(){

    $( function () {

        $.each( $('.product-single__gallery' ), function () {

            new SwiperGallery( $(this) );

        } );

    } );

    var SwiperGallery = function (obj) {

        //private properties
        var _self = this,
            _galleryTop = obj.find('.gallery__top'),
            _galleryThumbs = obj.find('.gallery__thumbs');

        //private methods
        var _initSlick = function(){

                _galleryTop.slick( {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    fade: true,
                    asNavFor: '.gallery__thumbs',
                    responsive: [
                        {
                            breakpoint: 768,
                            settings: {
                                fade: false
                            }
                        }
                    ]
                } );

                _galleryThumbs.slick( {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    asNavFor: '.gallery__top',
                    dots: false,
                    arrows: false,
                    focusOnSelect: true
                } );

            },
            _init = function () {
                _initSlick();
            };

        _init();
    };

} )();