"use strict";
( function(){

    $( function () {

        $.each( $('.count-product'), function () {

            new Spinner( $(this) );

        } );

    } );

    var Spinner = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _input = _obj.find('.count-product__input'),
            _btnUp = _obj.find('.count-product_add'),
            _btnDown = _obj.find('.count-product_del');

        //private methods
        var _addEvents = function () {

                _input.on( {
                    keypress: function () {

                        if ( ( event.which != 46 || $( this ).val().indexOf( '.' ) != -1 ) && ( event.which < 48 || event.which > 57 ) ) {
                            event.preventDefault();
                        }

                    }
                } );

                _input.on( {
                    keyup: function () {

                        if( _input.val() == '' ) {

                            _input.val( 1 );

                        }

                    }
                } );

                _btnUp.on( {
                    click: function () {

                        _addCount();

                        return false;

                    }
                } );

                _btnDown.on( {
                    click: function () {

                        _reduceCount();

                        return false;

                    }
                } );

            },
            _addCount = function() {

                var value = parseInt( _input.val() );

                _input.val( value + 1 );

            },
            _reduceCount = function(){

                var value = parseInt( _input.val() );

                if( value != 1 ) {

                    _input.val( value - 1 );

                }

            },
            _init = function () {
                _obj[0].obj = _self;
                _addEvents();
            };

        //public properties

        //public methods


        _init();
    };

} )();