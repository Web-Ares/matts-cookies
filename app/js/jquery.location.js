"use strict";
( function(){

    $( function () {

        $.each( $('.contact-us__map'), function () {

            new Location( $(this) );

        } );

    } );

    var Location = function ( obj ) {

        //private properties
        var _self = this,
            _obj = obj,
            mapName = _obj.attr('id'),
            mapLat = _obj.data('map-lat'),
            mapLng = _obj.data('map-lng'),
            iconPath = _obj.data('icon-path'),
            mapZoom = _obj.data('map-zoom'),
            myLatLng = { lat: _obj.data('map-lat'), lng: _obj.data('map-lng') },
            _window = $( window ),
            map,
            tileListener,
            marker,
            deltaY = 1.4;

        //private methods
        var _addEvents = function () {

                google.maps.event.addDomListener( window, 'resize', function() {

                    map.setCenter( myLatLng );

                    if( _window.width() >= 1024 ) {

                        _offsetCenter( map.getCenter(), 0, 0);

                    } else {

                        _offsetCenter( map.getCenter(), 0, -50 );

                    }

                } );

            },
            _initMap = function () {

                map = new google.maps.Map( document.getElementById('contact-google-map'), {
                    zoom: mapZoom,
                    scrollwheel: false,
                    center: { lat: mapLat, lng: mapLng }
                } );

                var image = {
                    url: iconPath,
                    scaledSize: new google.maps.Size(98, 91)
                };

                var beachMarker = new google.maps.Marker( {
                    position: { lat: mapLat, lng: mapLng },
                    map: map,
                    icon: image
                } );

                google.maps.event.addListenerOnce(map, 'idle', function() {

                    map.setCenter( myLatLng );

                    if( _window.width() >= 1024 ) {

                        _offsetCenter( map.getCenter(), 0, 0);

                    } else {

                        _offsetCenter( map.getCenter(), 0, -50 );

                    }

                } );

            },
            _offsetCenter = function ( latlng, offsetx, offsety ) {

                var scale = Math.pow( 2, map.getZoom() ),
                    worldCoordinateCenter = map.getProjection().fromLatLngToPoint( latlng ),
                    pixelOffset = new google.maps.Point( ( offsetx/scale ) || 0, ( offsety/scale ) || 0 ),
                    worldCoordinateNewCenter = new google.maps.Point(

                        worldCoordinateCenter.x - pixelOffset.x,
                        worldCoordinateCenter.y + pixelOffset.y

                    ),

                    newCenter = map.getProjection().fromPointToLatLng( worldCoordinateNewCenter );

                map.setCenter( newCenter );

            },
            _init = function () {

                google.maps.event.addDomListener( window, 'load', _initMap );
                _addEvents();

            };

        _init();
    };

} )();