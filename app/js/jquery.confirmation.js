"use strict";
( function(){


    $( function () {

        $(document).bind('gform_confirmation_loaded', function(event, formId){

            $('.sign-up').addClass('success');

        } );


    } );


} )();