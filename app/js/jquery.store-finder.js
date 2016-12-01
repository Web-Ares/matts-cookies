"use strict";
( function(){

    $( function () {

        $.each( $( '.store-finder' ), function() {

            new WriteDataInPopup ( $( this ) );

        } );

    } );

    var WriteDataInPopup = function( obj ) {

        //private properties
        var _self = this,
            _obj = obj,
            _input = _obj.find('input'),
            _select = _obj.find('select'),
            _btnSearch = _obj.find('.store-finders__search');

        //private methods
        var _addEvents = function() {
                _input.on( {
                    keyup: function ( e ) {

                        $('#wpsl-search-input').val( $(this).val() );

                        if( e.keyCode == 13 ) {

                            _btnSearch.trigger('click');

                        }

                    }
                } );
                $('#wpsl-search-input').on( {
                    keyup: function () {

                        _input.val( $(this).val() );

                    }
                } );
                _select.on( {
                    change: function() {

                        var selectedVal = $(this).find('option:selected').val();

                        $('#wpsl-radius-dropdown').find('option:selected').removeAttr('selected');
                        $('#wpsl-radius-dropdown').find('option[value='+ selectedVal +']').attr('selected', 'selected');

                    }
                } );
                _btnSearch.on( {
                    click: function() {

                        $('#wpsl-search-btn').trigger('click');

                        var selectedVal = _select.find('option:selected').val();

                        $('#wpsl-radius-dropdown').find('option:selected').removeAttr('selected');
                        $('#wpsl-radius-dropdown').find('option[value='+ selectedVal +']').attr('selected', 'selected');

                        $('#wpsl-search-input').val( _input.val() );

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