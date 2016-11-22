( function(){

    $( function(){

        $( '.popup' ).each(function(){

            new Popup($(this));

        });

    });

    var Popup = function( obj ){

        //private properties
        var _self = this,
            _popupPadding = 40,
            _btnShow =  $( '.popup__open' ),
            _obj = obj,
            _btnClose = _obj.find( '.popup__close, .popup__cancel' ),
            _wrap = _obj.find( '.popup__wrap' ),
            _contents = _obj.find( '.popup__content' ),
            _scrollConteiner = $( 'html' ),
            _window = $( window ),
            _globalWidth,
            _timer = setTimeout( function(){}, 1 );

        //private methods
        var _centerWrap = function(){
                if ( _window.height() - ( _popupPadding * 2 ) - _wrap.height() > 0 ) {
                    _wrap.css( { top: ( ( _window.height() - ( _popupPadding * 2 ) ) - _wrap.height() ) / 2 } );
                } else {
                    _wrap.css( { top: 0 } );
                }
            },
            _getScrollWidth = function (){
                var scrollDiv = document.createElement( 'div'),
                    scrollBarWidth;

                scrollDiv.className = 'popup__scrollbar-measure';

                document.body.appendChild( scrollDiv );

                scrollBarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;

                document.body.removeChild(scrollDiv);

                return scrollBarWidth;
            },
            _hide = function(){
                _obj.css( {
                    overflowY: 'hidden'
                } );
                _scrollConteiner.css( {
                    overflowY: 'auto',
                    paddingRight: 0
                } );

                _obj.removeClass( 'popup_opened' );
                _obj.addClass( 'popup_hide' );

                _timer = setTimeout( function(){

                    _obj.css ({
                        overflowY: 'scroll'
                    });

                    _obj.removeClass( 'popup_hide' );
                }, 300 );

            },
            _init = function(){
                _obj[ 0 ].obj = _self;
                _onEvents();
            },
            _onEvents = function(){
                _window.on( {
                    load: function () {

                        _globalWidth = _window.width();

                    },
                    resize: function(){
                        _centerWrap();

                        if( _window.width() >= 1024 ) {

                            if( _globalWidth != _window.width() ) {

                                _globalWidth = _window.width() + 1;

                                _hide();

                            }

                        }

                    }
                } );
                _btnShow.on( {
                    click: function(){

                        if( $(this).hasClass('cookies-info_btn') ) {

                            if( _window.width() < 1024 ) {

                                _show( $( this ).attr( 'data-popup' ) );
                                return false;

                            }

                        } else {

                            _show( $( this ).attr( 'data-popup' ) );
                            return false;

                        }

                    }
                } );
                _wrap.on( {
                    click: function( e ){
                        e.stopPropagation();
                    }
                } );
                _obj.on( {
                    click: function(){
                        _hide();
                        return false;
                    }
                } );
                _btnClose.on( {
                    click: function(){
                        _hide();
                        return false;
                    }
                } );
            },
            _show = function( className ){
                _setPopupContent( className );

                _scrollConteiner.css( {
                    overflowY: 'hidden',
                    paddingRight: _getScrollWidth()
                } );
                _obj.addClass( 'popup_opened' );
                _centerWrap();

            },
            _setPopupContent = function( className ){
                var curContent = _contents.filter( '.popup__' + className );

                _contents.css( { display: 'none' } );
                curContent.css( { display: 'block' } );
            };

        //public properties

        //public methods


        _init();
    };

} )();

