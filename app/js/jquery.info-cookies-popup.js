"use strict";
( function(){

    $( function () {

        $.each( $('.cookies-info_btn'), function () {

            new InfoCookiesPopup( $(this) );

        } );

    } );

    var InfoCookiesPopup = function ( obj ) {

        var _self = this,
            _obj = obj,
            _window = $( window),
            _popup = $('.popup__cookies-info');

        var _addEvents = function () {

                _obj.on( {
                    click: function() {

                        if( _window.width() < 1024 ) {

                            var cirItem = $(this),
                                title = cirItem.find('.cookies-info__title'),
                                content = cirItem.find('.cookies-info__text');

                            _popup.find('.site__main-title').html( title.html() );
                            _popup.find('.cookies-info__description').html( content.html() )

                        }

                    }
                } );

            },
            _init = function() {
                _obj[0].obj = _self;
                _addEvents();

            };

        _init();
    };

} )();