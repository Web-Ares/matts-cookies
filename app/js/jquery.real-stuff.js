"use strict";
( function(){

    var globalScrollFlag = true;

    $( function () {

        $.each( $( '.real-stuff' ), function() {

            new RealStuffBtnShow ( $( this ) );

        } );

        $.each( $( '.real-stuff__products' ), function() {

            new RealStuffIngredientsShow ( $( this ) );

        } );

    } );

    var RealStuffBtnShow = function( obj ) {

        //private properties
        var _self = this,
            _obj = obj,
            _window = $(window),
            _globalWidth = 0,
            _header = $('.site__header'),
            _ingredientsList = _obj.find('.real-stuff__ingredients-list'),
            _dom =  $( 'html, body'),
            _showMoreBtn = _obj.find('.btn');

        //private methods
        var _addEvents = function() {

                _window.on( {
                    load: function () {

                        _globalWidth = _window.width();

                    },
                    resize: function () {

                        if( _globalWidth != _window.width() ) {

                            _globalWidth = _window.width() + 1;

                            if( _showMoreBtn.hasClass('opened') ) {

                                _closeList( _showMoreBtn, _showMoreBtn.data('close') );

                            }

                        }

                    }
                } );
                _showMoreBtn.on( {
                    click: function() {

                        var curItem = $(this),
                            curItemTextOpen = curItem.data('open'),
                            curItemTextClose = curItem.data('close');

                        if( curItem.hasClass('opened') ) {

                            _closeList( curItem,curItemTextClose );

                        } else {

                            _openList( curItem,curItemTextOpen )

                        }

                        return false;

                    }
                } );

            },
            _closeList = function( elem, text ) {

                elem.removeClass('opened');
                elem.text(text);
                _ingredientsList.css( {
                    height: 0
                } );
                _dom.stop( true, false );
                _dom.animate( {
                    scrollTop: $('.real-stuff').offset().top - $('.site__header').innerHeight()

                }, {
                    duration: 500,
                    progress: function () {
                        globalScrollFlag = false;
                        _header.addClass( 'site__header_hidden' );
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

            },
            _openList = function( elem, text ) {

                elem.addClass('opened');
                elem.text(text);
                _ingredientsList.css( {
                    height: _ingredientsList.find('>div').innerHeight()
                } );
                _dom.stop( true, false );
                _dom.animate( {
                    scrollTop: _ingredientsList.offset().top - $('.site__header').innerHeight()

                }, {
                    duration: 500,
                    progress: function () {
                        globalScrollFlag = false;
                        _header.addClass( 'site__header_hidden' );
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

            },
            _init = function() {
                _obj[ 0 ].obj = _self;
                _addEvents();
            };

        _init();
    };

    var RealStuffIngredientsShow = function( obj ) {

        //private properties
        var _self = this,
            _obj = obj,
            _header = $( '.site__header'),
            _step1 = 15,
            _step2 = 2,
            _step3 = 5,
            _step4 = 6,
            _step5 = 7,
            _window = $(window),
            _globalWidth = 0,
            _dom =  $( 'html, body'),
            _ingredientsContent = _obj.find('.real-stuff__description-content'),
            _ingredientsBtnShow = _obj.find('.real-stuff__description-btn');

        //private methods
        var _addEvents = function() {

                _ingredientsBtnShow.on( {
                    click: function() {

                        if( _window.width() >= 1024 ) {

                            var curItem = $(this),
                                nextContent = curItem.next(),
                                parent = curItem.parent();

                            if( curItem.hasClass('opened') ) {

                                _closeContent(curItem, parent, nextContent);


                            } else {

                                _openContent(curItem, parent, nextContent);

                            }

                            return false;

                        }



                    }
                } );
                _window.on( {
                    load: function () {

                        _globalWidth = _window.width();

                    },
                    resize: function () {

                        if( ( _window.width() >= 1024 ) ) {

                            _setPos();

                        } else {

                            if( _globalWidth != _window.width() ) {

                                _globalWidth = _window.width() + 1;

                                _closeContent( _ingredientsBtnShow, _obj, _ingredientsContent );

                            }

                        }

                    }
                } );
                $(document).on(
                    "click",
                    ".real-stuff__description-content",
                    function( event ){
                        event = event || window.event;

                        if (event.stopPropagation) {
                            event.stopPropagation();
                        } else {
                            event.cancelBubble = true;
                        }
                    }
                );
                $(document).on(
                    "click",
                    "body",
                    function(){

                        _closeContent( _ingredientsBtnShow, _obj, _ingredientsContent );
                        $('.real-stuff__description').removeClass('opened');

                    }
                );
                $(document).on(
                    'mousemove',
                    'body',
                    function( e ) {

                        e = e || window.event;

                        var slide = $(this),
                            _img1 = slide.find('.real-stuff__products-img'),
                            _img2 = slide.find('.real-stuff__description_1:not(.opened)'),
                            _img3 = slide.find('.real-stuff__description_2:not(.opened)'),
                            _img4 = slide.find('.real-stuff__description_3:not(.opened)'),
                            _img5 = slide.find('.real-stuff__description_4:not(.opened)'),
                            _img6 = slide.find('.real-stuff__description_5:not(.opened)'),
                            _img7 = slide.find('.real-stuff__description_6:not(.opened)');

                        if ( _window.width() > 1024 && !( _header.hasClass('opened') ) ) {

                            var pageX = e.clientX,
                                pageY = e.clientY,
                                halfWidth = _obj.width() / 2,
                                halfHeight = _obj.height() / 2,
                                percentFromCenterX = ( pageX - halfWidth ) / halfWidth,
                                percentFromCenterY = ( pageY - halfHeight ) / halfHeight;

                            if (_window.outerWidth() > 1024) {

                                //_moveTop( percentFromCenterX, percentFromCenterY, _step2, _img1 );
                                _moveTop(percentFromCenterX, percentFromCenterY, _step3, _img2);
                                _moveBottom(percentFromCenterX, percentFromCenterY, _step4, _img3);
                                _moveTop(percentFromCenterX, percentFromCenterY, _step5, _img4);
                                _moveBottom(percentFromCenterX, percentFromCenterY, _step3, _img5);
                                _moveBottom(percentFromCenterX, percentFromCenterY, _step1, _img6);
                                _moveBottom(percentFromCenterX, percentFromCenterY, _step5, _img7);

                            }

                        }

                    }
                );

            },
            _closeContent = function( curItem, parent, nextContent ) {

                curItem.removeClass('opened');
                parent.removeClass('opened');

            },
            _openContent = function( curItem, parent, nextContent ) {

                _ingredientsBtnShow.removeClass('opened');
                $('.real-stuff__description').removeClass('opened');

                curItem.addClass('opened');
                parent.addClass('opened');

                _dom.stop( true, false );
                _dom.animate( { scrollTop: nextContent.offset().top - 40 - $('.site__header').innerHeight()  }, 300 );

            },
            _setPos = function() {

                _ingredientsContent.each( function() {

                    var curItem = $(this);

                    if( curItem.offset().left + curItem.innerWidth() >= _window.width() ) {

                        curItem.addClass('right_pos');

                    } else {

                        curItem.removeClass('right_pos');

                    }

                    if( curItem.offset().left <= 0 ) {

                        curItem.addClass('left_pos');

                    } else {

                        curItem.removeClass('left_pos');

                    }

                } );

            },
            _moveBottom = function( xPercent, yPercent, step, image ) {

                image.css( {
                    '-webkit-transform': 'translate( ' + -( xPercent * step ) + 'px,' + -( yPercent * step ) + 'px )',
                    'transform': 'translate( ' + -( xPercent * step ) + 'px, ' + -( yPercent * step ) + 'px  )'
                } );

            },
            _moveTop = function( xPercent, yPercent, step, image ) {

                image.css( {
                    '-webkit-transform': 'translate( ' + ( xPercent * step ) + 'px ,' + ( yPercent * step ) + 'px  )',
                    'transform': 'translate( ' + ( xPercent * step ) + 'px , ' + ( yPercent * step ) + 'px  )'
                } );

            },
            _init = function() {
                _obj[ 0 ].obj = _self;
                _addEvents();
                _setPos();
            };

        _init();
    };

} )();