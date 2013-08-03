
$(document).ready(function(){
    //Google Maps
    var APIkey = "AIzaSyBSPJm_l1q0JWgK6ZhJNzjwmQ4-pFJxkzc"
    var kmlSrc = "https://maps.google.com.my/maps/ms?ie=UTF8&authuser=0&msa=0&output=kml&msid=215254376920118074950.0004c7c0fe5b02177d447"
    function initialize() {
        var mapOptions = {
          // center: new google.maps.LatLng(3.7, 103),
          zoom: 7,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
  
        var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions)
        
        kmlOptions = {
            map: map
        }
        var cafesLayer = new google.maps.KmlLayer(kmlSrc, kmlOptions)
    }

    google.maps.event.addDomListener(window, 'load', initialize);

})