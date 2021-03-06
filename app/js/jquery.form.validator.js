"use strict";
( function(){

    window.requestAnimFrame = (function(){
        return  window.requestAnimationFrame       ||
            function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    $( function () {

        $.each( $( '.checkout' ), function() {

            new FormValidator ( $( this ) );

        } );

    } );

    var FormValidator = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _fields = _obj.find( '[data-required]' ),
            _window = $(window),
            _back = _obj.find( '.checkout__back' ),
            _proceedPayment = _obj.find( '.checkout__proceed-payment' ),
            _btn = _obj.find( '.checkout__proceed .btn' );

        //private methods
        var _constructor = function () {
                _onEvents();
                _obj[0].obj = _self;
            },
            _addNotTouchedClass = function () {

                _fields.each( function() {

                    var curItem = $(this);

                    if( curItem.parents('.checkout__info-billing').length ) {

                        if( curItem.parents('.checkout__info-billing').hasClass('visible') ) {

                            if( curItem.val() === '' ){

                                curItem.addClass( 'not-touched' );

                                _validateField( curItem );

                            }

                        }

                    } else {

                        if( curItem.val() === '' ){

                            curItem.addClass( 'not-touched' );

                            _validateField( curItem );

                        }

                    }


                } );

            },
            _onEvents = function () {
                _window.on( {
                    load: function() {

                        $( 'body' ).trigger( 'update_checkout' );

                    }
                } );
                _fields.on( {
                    focus: function() {

                        $( this ).removeClass( 'not-touched' );

                    },
                    keyup: function() {

                        var curItem = $(this);

                        if( curItem.parents('.checkout__info-billing').length ) {

                            if( curItem.parents('.checkout__info-billing').hasClass('visible') ) {

                                _validateField( $( this ) );

                            }

                        } else {

                            _validateField( $( this ) );

                        }

                    }
                } );
                _btn.on( {
                    click: function() {

                        _addNotTouchedClass();

                        if( _fields.hasClass('not-touched') || _fields.hasClass('not-valid') ) {

                            _obj.find('.not-touched:first').focus();
                            _obj.find('.not-valid:first').focus();

                        } else {

                            $('.checkout__form').addClass('hidden');
                            $('.my-cart__review').addClass('visible');
                            $( 'body' ).trigger( 'update_checkout' );

                            _checkBlock();

                        }

                        return false;

                    }
                } );
                _back.on( {
                    click: function() {

                        $('.checkout__form').removeClass('hidden');
                        $('.my-cart__review').removeClass('visible');

                        //cancelRequestAnimFrame(  );


                        return false;

                    }
                } );
            },
            _makeNotValid = function ( field ) {
                field.addClass( 'not-valid' );
                field.removeClass( 'valid' );
            },
            _makeValid = function ( field ) {
                field.removeClass( 'not-valid' );
                field.addClass( 'valid' );
            },
            _validateEmail = function ( email ) {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            },
            _checkBlock = function () {

                requestAnimationFrame( _checkBlock );
                _loop();

            },
            _loop = function() {

                if( _obj.find('.shipping_method-success').length ) {

                    $('#payment').addClass('visible');
                    _back.addClass('hidden');
                    _proceedPayment.addClass('visible');

                } else {

                    $('#payment').removeClass('visible');
                    _back.removeClass('hidden');
                    _proceedPayment.removeClass('visible');

                }

            },
            _validateField = function ( field ) {
                var type = field.attr( 'type' );

                if( type === 'email' || type === 'text' ){

                    if( field.val() === '' ){
                        _makeNotValid( field );
                        return false;
                    }

                }

                if( type === 'email' ){
                    if( !_validateEmail( field.val() ) ){
                        _makeNotValid( field );
                        return false;
                    }
                }

                _makeValid( field );
            };

        //public properties

        //public methods
        _self.checkValid = function () {
            var valid = true;

            _fields.each( function () {
                $( this ).removeClass( 'not-touched' );
                if( $( this ).hasClass( 'not-valid' ) ){
                    valid = false;

                }
            } );

            return valid;
        };

        _constructor();
    };

} )();
