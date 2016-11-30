"use strict";
( function() {

    $( function () {

        $.each( $( '.site_index .logo' ), function() {

            new ScrollTop ( $( this ) );

        } );

        $('#wpsl-stores ').perfectScrollbar();

    } );

    var ScrollTop = function( obj ) {

        //private properties
        var _self = this,
            _obj = obj,
            _window = $(window),
            _dom =  $( 'html, body');

        //private methods
        var _addEvents = function() {

                _obj.on( {
                    click: function () {

                        if( _window.width() >= 1024 ) {

                            _dom.stop( true, false );
                            _dom.animate( { scrollTop: $('.site').offset().top  }, 300 );

                        } else {

                            _dom.stop( true, false );
                            _dom.animate( { scrollTop: $('.site').offset().top  }, 300 );

                        }

                        return false;

                    }
                } );

            },
            _init = function() {
                _obj[ 0 ].obj = _self;
                _addEvents();
            };

        _init();
    };

} )();