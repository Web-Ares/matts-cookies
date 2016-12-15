"use strict";
( function(){

    var globalScrollFlag = true;

    $( function () {

        new Preloader( $('.preloader') );

        $.each( $( '.site__header' ), function() {

            new Menu ( $( this ) );

        } );

        $.each( $('[data-href]'), function () {

            new ScrollPanel( $(this) );

        } );

        $.each( $('.slides'), function () {

            new Slides( $(this) );

        } );

        $.each( $('.site__content-full'), function () {

            new FullHeight( $(this) );

        } );

        $.each( $('.site_index'), function () {

            new ScrollToHash( $(this) );

        } );

    } );

    var Preloader = function (obj) {

        //private properties
        var _self = this,
            _window = $( window ),
            _preloader = obj,
            _body = $('body');

        //private methods
        var _addEvents = function () {

                _window.on( {
                    load: function(){

                        _showSite();

                    }
                } );

            },
            _init = function () {

                _body[0].preloader = _self;
                _addEvents();



                $('html').css( {
                    'overflow-y': 'hidden'
                } );

            },
            _showSite = function() {

                _preloader.addClass( 'preloader_loaded' );

                setTimeout(function(){
                    _preloader.remove();

                    $('html').css( {
                        'overflow-y': 'scroll'
                    } );
                    $('.site').addClass( 'site__loaded' );

                },500);
            };

        //public properties

        //public methods


        _init();
    };

    var Menu = function( obj ) {

        //private properties
        var _self = this,
            _obj = obj,
            _window = $(window),
            _html = $('html'),
            _menu = _obj.find('.site__menu'),
            _content = $('.site__content'),
            _action = false,
            _action2 = false,
            _flagHide = true,
            lastScrollTop = 0,
            _showMenuBtn = _obj.find('.site__menu-btn'),
            _globalWidth = 0;

        //private methods
        var _addEvents = function() {

                _window.on( {
                    load: function () {

                        _globalWidth = _window.width();

                    },
                    resize: function () {

                        if( _globalWidth != _window.width() ) {

                            _globalWidth = _window.width() + 1;


                            if( _window.width() >= 1024 ) {

                                _menu.scrollTop(0);
                                _closeMenu( _showMenuBtn );

                            }

                        }

                    },
                    'scroll': function () {

                        _action = _window.scrollTop() >= _obj.innerHeight() * 2;

                        if( _window.scrollTop() >= _obj.innerHeight()+ 20 ) {

                            if( _flagHide ) {

                                _flagHide = false;
                                _obj.addClass( 'site__header_hide' );

                            }


                        } else {

                            _flagHide = true;
                            _obj.removeClass( 'site__header_hide' );

                        }


                        if( _action ) {

                            if( _obj.hasClass( 'site__header_hide' ) ) {

                                setTimeout( function() {

                                    _obj.addClass( 'site__header_fixed' );
                                    _obj.removeClass( 'site__header_hide' );

                                }, 100 );

                            }


                        } else if ( _window.scrollTop() <= _obj.innerHeight() * 3 ) {

                            _obj.removeClass( 'site__header_fixed' );
                            _obj.removeClass( 'site__header_hidden' );

                        }

                        if( _window.scrollTop() <= 10 ) {

                            _obj.removeClass( 'site__header_fixed' );
                            _obj.removeClass( 'site__header_hidden' );

                        }

                    },
                    'DOMMouseScroll': function ( e ) {

                        var delta = e.originalEvent.detail;

                        if ( delta ) {

                            var direction = ( delta > 0 ) ? 1 : -1;

                            _checkScroll( direction );

                        }

                        if ( direction < 0  ) {

                            _action2 = true;

                        } else {

                            setTimeout( function() {

                                _action2 = false;

                            }, 300 )

                        }


                    },
                    'mousewheel': function ( e ) {

                        var delta = e.originalEvent.wheelDelta;

                        if ( delta ) {

                            var direction = ( delta > 0 ) ? -1 : 1;

                            _checkScroll( direction );

                        }

                        if ( direction < 0  ) {

                            _action2 = true;

                        } else {

                            setTimeout( function() {

                                _action2 = false;

                            }, 300 )

                        }

                    }

                } );

                $(window).scroll(function(event){

                    var st = $(this).scrollTop();

                    if (st > lastScrollTop){

                        _checkScroll( 1 );

                        var direction = 1

                    } else {

                        _checkScroll( -1 );

                        var direction = -1

                    }
                    lastScrollTop = st;

                    if ( direction < 0  ) {

                        _action2 = true;

                    } else {

                        setTimeout( function() {

                            _action2 = false;

                        }, 300 )

                    }
                });

                _showMenuBtn.on( {
                    click: function() {

                        if( $( this ).hasClass( 'opened' ) ) {

                            _closeMenu( $( this ) )


                        } else {

                            _openMenu( $( this ) );

                        }


                    }
                } );

            },
            _checkScroll = function( direction ) {

                if( direction > 0 && !_obj.hasClass( 'site__header_hidden' ) && !_showMenuBtn.hasClass( 'opened' ) && _action && !_action2 ){

                    _obj.addClass( 'site__header_hidden' );

                }

                if( direction < 0 && _obj.hasClass( 'site__header_hidden' ) && !_showMenuBtn.hasClass( 'opened' )  && _action && _action2 && globalScrollFlag ){

                    _obj.removeClass('site__header_hidden');

                }

            },
            _closeMenu = function( elem ) {

                _html.css( {
                    overflowY: 'auto'
                } );

                elem.removeClass( 'opened' );
                _obj.removeClass( 'opened-menu' );

            },
            _init = function() {
                _obj[ 0 ].obj = _self;
                _addEvents();
            },
            _openMenu = function( elem )  {

                elem.addClass( 'opened' );
                _obj.addClass( 'opened-menu' );

                _html.css( {
                    overflowY: 'hidden'
                } );

            };

        _init();
    };

    var ScrollPanel = function ( obj ) {

        var _self = this,
            _obj = obj,
            _links = _obj,
            _html = $('html'),
            _window = $(window),
            _dom =  $( 'html, body'),
            _header = $('.site__header'),
            _popup = $('.popup__cookies-info');

        var _addEvents = function () {

                _window.on( {
                    resize: function () {

                        _changeActive();

                    },
                    'scroll': function () {

                        _changeActive();

                    }

                } );
                _links.on( {
                    click: function() {

                        var curItem = $( this ),
                            newClass = curItem.attr('data-href'),
                            nextItemTop = $( '.' + newClass  ).offset().top;

                        var heightHeader = _header.innerHeight();

                        $('.site__menu-nav_anchors a').removeClass('active');
                        curItem.addClass('active');

                        _dom.stop( true, false );
                        _dom.animate( {
                            scrollTop: nextItemTop - heightHeader

                        }, {
                            duration: 500,
                            progress: function () {
                                globalScrollFlag = false;
                                _header.addClass( 'site__header_hidden' );
                                heightHeader = _header.innerHeight();
                            },
                            complete: function () {

                                setTimeout( function() {
                                    globalScrollFlag = false;
                                }, 200 );

                                setTimeout( function() {
                                    globalScrollFlag = true
                                }, 500 );

                            }
                        });

                        _html.css( {
                            overflowY: 'auto'
                        } );

                        _header.find('.site__menu-btn').removeClass( 'opened' );
                        _header.removeClass( 'opened-menu' );

                        return false;

                    }
                } );

            },
            _changeActive = function () {

                var scrollTop = _window.scrollTop(),
                    item = $('body').find('[data-scroll="scroll"]'),
                    itemPos = item.offset().top;

                for(var i = 0; i < item.length; i++ ) {

                    var cur = $(item[i]),
                        itemCur = $(item[i]).offset().top - _header.outerHeight(true),
                        itemHeight = $(item[i]).outerHeight(true);

                    if( scrollTop > itemCur - 20 ) {

                        var curClass = cur.attr('class').split(' '),
                            curLink = _links.filter("[data-href="+curClass[0]+"]");

                        _links.removeClass('active');
                        curLink.addClass('active');

                    }
                    if( scrollTop > ( itemCur + itemHeight ) ){

                        _links.removeClass('active');

                    }
                }
            },
            _init = function() {
                _obj[0].obj = _self;
                _addEvents();
            };

        _init();
    };

    var Slides = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _window = $(window);

        //private methods
        var _addEvents = function () {
                _window.on({
                    load: function() {
                        _checkScroll();
                    },
                    scroll: function () {
                        _checkScroll();
                    }
                });
            },
            _checkScroll = function(){

                var curScroll = _window.scrollTop(),
                    windowH = _window.height(),
                    topPos = _obj.offset().top,
                    topInWindow = topPos-curScroll,
                    visiblePercent = 1-(topInWindow/windowH);

                if( visiblePercent > .5 ){
                    if( !_obj.hasClass('slides_active') ){
                        _obj.addClass('slides_active');
                    }
                }

            },
            _init = function () {
                _obj[0].slides = _self;
                _addEvents();

            };

        //public properties

        //public methods


        _init();
    };

    var FullHeight = function (obj) {

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
                    'min-height': height - _header.innerHeight() - $('.site__main-title').outerHeight(true)
                } );

                if( _obj.find('.contact-us').length ) {

                    if( _window.width() >= 1024 ) {

                        _obj.css( {
                            'min-height': ''
                        } );

                    } else {

                        _obj.css( {
                            'min-height': height - _header.innerHeight() - $('.site__main-title').outerHeight(true)
                        } );

                    }

                } else {

                    _obj.css( {
                        'min-height': height - _header.innerHeight() - $('.site__main-title').outerHeight(true)
                    } );

                }

            };

        _init();
    };

    var ScrollToHash = function ( obj ) {

        var _self = this,
            _obj = obj,
            _window = $(window),
            _dom =  $('html, body');

        var _addEvents = function () {

                _window.on( {
                    load: function () {

                        setTimeout( function() {

                            _scrollTo();

                        }, 100 );

                    }

                } );

            },
            _scrollTo = function() {

                var hash = window.location.hash.replace('#', '');

                if( hash ) {

                    var elem = $( '.' + window.location.hash.replace('#', '') );

                    if( elem.length ) {

                        window.scrollTo( 0, parseInt( elem.offset().top ) );

                    }

                    $('.slides').addClass('slides_active');

                }

            },
            _init = function() {
                _obj[0].obj = _self;
                _addEvents();
            };

        _init();
    };

} )();