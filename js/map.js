
$(document).ready(function(){

    //################################################ GLOBAL VARS ###################################################
    var globalDoc   //Doc returned by geoXML parser with kml JSON. Check documentation for details.
    var gmap        //Google Map in use
    var cafes = []
    cafes['participatingKV']    = new Array()
    cafes['notParticipatingKV'] = new Array()
    cafes['notInKV']            = new Array()

    var markerIcons = []
    markerIcons['outOfTown']       = chklDomain + 'img/map-icons/chkl-pin-01.png'
    markerIcons['participating']   = chklDomain + 'img/map-icons/chkl-pin-03.png'
    markerIcons['default']         = chklDomain + 'img/map-icons/chkl-pin-02.png'
    markerIcons['me']         = chklDomain + 'img/map-icons/chkl-pin-me.png'

    var globalInfoWindow = new google.maps.InfoWindow() //only want one custom infowindow open

    var defaultBounds 
    var defaultZoom 
    
    var userMarker //user's current location
    var latlngAddressMap = new Array()

    var mouseOverDiv = $("<div>").addClass('mouseover-text').hide()
    $('body').append(mouseOverDiv)

    //################################################ INITIALIZERS ###################################################
    function initializeListScroller(){
        //Set plugin scrollbar
        $(divWithLocationsListSelector).height('520px').mCustomScrollbar({
            theme: 'dark-thick',
        })
    }

    // Callback to initialize GMaps with geoXML3
    function initialize() {
        var mapOptions = {
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          center: new google.maps.LatLng(-1, -1),
          zoom: 8,

        };
        
        gmap = new google.maps.Map(document.getElementById("map-canvas"), mapOptions)
        
        var kmlParser = new geoXML3.parser(
            {   map: gmap,
                zoom: "false",
                afterParse: parserCallback
            })  

        kmlParser.parse(kmlSrc)
        return kmlParser
    }

    function parserCallback(doc){
        listLocations(doc)
        prepGmaps()
        getUserLocation(showUserOnMap)

        addLocationDetails()
    }

    function getUserLocation(callback){
        navigator.geolocation.getCurrentPosition(callback);
    }

    //Get user location
    function showUserOnMap(position){
        userMarker = new google.maps.Marker({
            position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
            icon: markerIcons['me']
        })

        google.maps.event.addListener(userMarker, 'click', function(){
            globalInfoWindow.setContent("<h3>You Are Here!</h3>")
            globalInfoWindow.open(gmap, this)
            gmap.setCenter(this.getPosition())
            gmap.setZoom(13)
        })

        userMarker.setMap(gmap)
    }


    function prepGmaps(){
        //Add listener, sometimes zoom is set before map is done loading
        google.maps.event.addListenerOnce(gmap, 'bounds_changed', function() {
            gmap.setCenter(new google.maps.LatLng(3.136402, 101.66394))
            gmap.setZoom(11);
            defaultBounds = gmap.getBounds()
            defaultZoom = gmap.getZoom()

        });
    }

    function addLocationDetails(){
        $.get(chklBaseUrl + 'js/cafes.json', function(data){
            var cafes = data.cafes
            var locationList = $("ul#locations")

            for(var i = 0; i < cafes.length; i++){
                var currCafe = cafes[i]
                var currLi = $("li#" + currCafe.key, locationList)
                var deets = $("span.loc-desc", currLi)

                deets.html("<span>" + currCafe.phoneNumber + "</span>")
                deets.append("<span>" + currCafe.address + "</span>")
                deets.append("<span>" + currCafe.hours + "</span>")
                
                if(currCafe.site && currCafe.site.length > 0)
                    deets.append("<a target='_blank' href='" + currCafe.site + "'>" + "Facebook Page" + "</a>")
                
                var types = $("<div>").addClass("cafe-types")

                if(currCafe.espresso == "Y"){
                    types.append($('<img>').prop('src', cafeTypesIcons['espresso']).addClass('Espresso'))
                }if(currCafe.handbrew == "Y"){
                    types.append($('<img>').prop('src', cafeTypesIcons['handbrew']).addClass('Handbrew'))
                }if(currCafe.lunch == "Y"){
                    types.append($('<img>').prop('src', cafeTypesIcons['lunch']).addClass('Lunch'))
                }if(currCafe.dinner == "Y"){
                    types.append($('<img>').prop('src', cafeTypesIcons['dinner']).addClass('Dinner'))
                }if(currCafe.pastryOnly == "Y"){
                    types.append($('<img>').prop('src', cafeTypesIcons['pastryOnly']).addClass('Pastry only'))
                }

                $("img", types).mouseenter(function(){
                    $(mouseOverDiv).show()
                    var text = $(mouseOverDiv).html($(this).attr('class'))
                    // $(text).css({position: 'fixed'})
                    $(text).offset({
                        top: $(this).offset().top - 30,
                        left: $(this).offset().left,
                        right: $(this).offset().right,
                    })
                }).mouseleave(function(){
                    $(mouseOverDiv).hide()
                })
                deets.append(types)

                currLi.addClass("partner-cafe")
                deets.addClass("partner-cafe")


                $(currLi).append(deets)
            }
        }, 'json')
    }
    //Append locations to list from geoXML3 doc and set listeners for markers
    function listLocations(doc){
        globalDoc = doc

        //Assume only one doc for now
        //Assume placemarks and markers are synchronized (it is for geoxml3)
        var placemarks = doc[0].placemarks
        var markers = doc[0].markers

        //Append number of cafes
        $("li a#all").append(" " + markers.length + " Cafes")
        //Sort placemarks and markers
        placemarks = placemarks.sort(function(a, b){
            return (a.name).localeCompare(b.name)
        })
        markers = markers.sort(function(a, b){
            return (a.title).localeCompare(b.title)
        })

        //Add location details to location ul
        var locationsList = $(locationsListSelector)
        for(var i = 0; i < placemarks.length; i++){
            //For each placemark, list title and description free of inline styling
            var placemark = placemarks[i]
            var marker = markers[i]

            var markerID = makeID(marker.title)

             //Remove inline styling from placemark description
            var cleanDescriptions = removeStyle($('<span class="loc-desc">' + placemark.description + '</span>'))

            //Create li element with title and description as contents
            //Link to loc on Google Maps (external)
            var liElement = $('<li>').attr('id', markerID).append($('<strong class="title">').attr('id', markerID).append(placemark.name))
            
            liElement.append(cleanDescriptions)
            
            $(locationsList).append(liElement)

            var m = marker
            
            //Customize icons based on existing color of icon from before
            // and sort into cafes map
            //Green : Participating cafe
            //Purple: Outside of KlangValley
            //Default: In Klang Valley but not participating

            var iconURL = markerIcons['default']


            if(m && m.getIcon()){
                if(m.getIcon().url.indexOf("purple") > -1){
                   cafes["notInKV"].push(markerID)
                    iconURL = markerIcons['outOfTown']
                }
                else if(m.getIcon().url.indexOf("green") > -1){
                    cafes["participatingKV"].push(markerID)
                    iconURL = markerIcons['participating']
                }
                else{
                    cafes["notParticipatingKV"].push(markerID)
                }
            }

            //Set custom marker
            m.setIcon({
                url: iconURL
            })

            //Set marker listener to highlight each li onclick
            google.maps.event.clearListeners(m, 'click')

            google.maps.event.addListener(m, 'click', function(){
                var markerID = makeID(this.title)
               
                //show all cafes
                $(searchBarSelector).val('')
                $(listToSearchSelector + " li").show(function(){
                    //Update scrollbar
                    $(divWithLocationsListSelector).mCustomScrollbar("update")

                    //Scroll to selected position
                    $(divWithLocationsListSelector).mCustomScrollbar("scrollTo", "li#" + markerID)
                })    


                selectLocationLi(markerID, this)

                //Zoom to location and center it. Have to set center first, for first time click otherwise it'll zoom in 
                //some random position even though getPosition() returns correct latlng values. Some bug.
                gmap.setCenter(this.getPosition())
                gmap.setZoom(15)
                gmap.panTo(this.getPosition())

                var thisPlacemark = getPlaceMarkForMarker(this)
                 //Clean infowindow

                globalInfoWindow.setContent("<div class='iw-holder' id=" + markerID 
                    + "-iw><h3>" + thisPlacemark.name + "</h3>" + '<a class="directions-link" href="#' 
                    + markerID + '">Details</a></div>')
                globalInfoWindow.open(gmap, this)
                $('div#' + markerID + "-iw").on('linkReady', function(event, link){
                    $(this).append(link)

                })
            })
        }

        //Other locations list initializers
        setLocationListOnlick()
        initializeListScroller()
        collapseLocationListDesc()
    }

    //################################################## ZONING FUNCTIONS //################################################
    function zoomToZone(zoneName){
        $.get('js/zones.json', function(data){
            var zone
            for(var i = 0; i < data.zones.length; i++){
                var currZone = data.zones[i]
                if(currZone.id == zoneName){
                    zone = currZone
                    break
                }
            }
            var sw = zone.sw 
            var ne = zone.ne
            var swLL = new google.maps.LatLng(sw.lat, sw.lng)
            var neLL = new google.maps.LatLng(ne.lat, ne.lng)

            var latlngBounds = new google.maps.LatLngBounds(swLL, neLL)
            gmap.fitBounds(latlngBounds)
            gmap.setZoom(zone.zoom)

        }, 'json')
    }


    //####################################### MARKER/LOCATION LI ONLCLICK FUNCTIONS //#######################################
    function getLinkToLocOnGmaps(marker){
        var markerLatLng = marker.getPosition()
        var desc = marker.title + "+" + latlngAddressMap[markerLatLng.toUrlValue()]
        desc = desc.replace(/[\s\W]/g, "+")

        var linkToLoc = "http://maps.google.com/maps?"
            + "q=" + desc 
            + "&ll=" + markerLatLng.toUrlValue()
            + "&iwloc=A&hl=en" 

        return linkToLoc
    }
    function getPlaceMarkForMarker(marker){
        var placemark 

        for(var i = 0; i < globalDoc[0].placemarks.length; i++){
            var p = globalDoc[0].placemarks[i]

            if(makeID(p.name) == makeID(marker.title)){
                placemark = p
            }
        }

        return placemark
    }

     // Make each location <li> clickable to pop up corresponding marker info window
    function selectLocationLi(markerID, marker){
        //Remove selector class from other li
        var allLis = $('ul#locations li')
        allLis.removeClass('selected')

        //Add selector class to li
        var thisLi = $('li#' + markerID)
        thisLi.addClass('selected')

        //Collapse all other location desc and only show desc for current li
        collapseLocationListDesc()
        showDetails(thisLi, marker)

    }

    function setLocationListOnlick(){
        $("ul#locations li").click(function(e){
            var markerTitle = $('.title', this).attr('id')
            var currMarker 
            //Find corresponding marker
            for(var i = 0; i < globalDoc[0].markers.length; i++){
                currMarker = globalDoc[0].markers[i]

                //Open info window for corresponding marker    
                if(makeID(currMarker.title) == markerTitle){
                    google.maps.event.trigger(currMarker, 'click')
                    break
                }
            }
        })
    }

    //Use Geocoder to get address. takes in a LatLng object and JQuery object to append it to
    function getAddress(latlng, marker, resultContainer) {
        var geocoder = new google.maps.Geocoder()
        var geocoderRequest = {
            latLng: marker.getPosition()
        }

        geocoder.geocode(geocoderRequest, function(results, status){

            if(results.length > 0){
                var add = results[0].formatted_address
                
                if(!$(resultContainer).parent('span').hasClass('partner-cafe'))
                  $(resultContainer).html(add)

                var loc = results[0].geometry.location
                var pos = marker.getPosition()

                latlngAddressMap[pos.toUrlValue()] = add
                getAndInsertDirections($(resultContainer), marker)
            }

        })
    }

    //Show location descriptions for location li
    function showDetails(obj, marker){
        getAndInsertAddress(obj, marker)
        var animationTime = 300
        var spanToShow = $("span.loc-desc", obj)

        if(spanToShow.css("display").trim() == "none"){
            spanToShow.show(animationTime, "linear")
        }

    }

    function getAndInsertDirections(obj, marker){
        //only add if it isn't there already
        var existingLink = $("a.directions-link", obj.parent()) 
        var linkExists = $(existingLink).length > 0

        var link = getLinkToLocOnGmaps(marker)
        var a = "<a class='directions-link' target='_blank'href='" + link + "'>Directions</a>"
        var markerID = makeID(marker.title)

        if(!linkExists){
            $(obj).parent().prepend(a)
        }

        $('div#' + markerID + "-iw").trigger('linkReady', a)
    }

    //Get address and insert it to obj
    function getAndInsertAddress(obj, marker){
        var addressSpanSelector = "span.loc-desc span.address"
        var addressSpan = $(addressSpanSelector, $(obj))

        //if span for address doesn't already exist
        if(addressSpan == null || addressSpan.size() < 1){
            var newSpan = $("<span>").attr('class', 'address')
            $("span.loc-desc", $(obj)).prepend(newSpan)
            addressSpan = newSpan
        }
        //if address isn't already there
        if(addressSpan.html() == ""){
            getAddress(marker.getPosition(), marker, addressSpan)
        }
    }

    //Collapse all location descriptions for location li
    function collapseLocationListDesc(){
        $('span.loc-desc', $(locationsListSelector)).hide()
    }

    //Display number of each type of cafe
    function showCafeCount(){
    }


    //################################################ FORMATTING FUNCTIONS ###############################################
    
    //Formats text to be suitable for id use
    function makeID(text){
        //removes funky symbols so ids are only alphanumeric
        return text.replace(/[\W]/g, "")
    }

    //Removes inline styling, breaks and non-breaking spaces, and removes <font> tags
    function removeStyle(element){
        var descendents = $(element).find('*')
        descendents.add($(element))

        //Remove inline styles and dir attributes
        descendents.removeAttr('style').removeAttr('dir')
        
        //Remove all <br>
        $(element).find('b').replaceWith(null)

        //Remove all <font>
        $(element).find('font').replaceWith(replaceElementTagWithSpan)

        //Remove all &nbsp; and remove double br
        var cleaned = $(element)[0].outerHTML.replace("&nbsp;", "").replace(/<br><br>/gi, "<br>")
        return cleaned
    }

    // Callback for replaceWith for fonts
    var replaceElementTagWithSpan =  function(){
        return $('<span>').append($(this).contents())
    }



    //###################################################### RUN CODE #####################################################
    google.maps.event.addDomListener(window, 'load', initialize);

    $("ul#zones-list li a").click(function(){
        $("ul#zones-list li a").removeClass("selected")
        $(this).addClass("selected")

        if($(this).attr('id') == "all"){
            gmap.fitBounds(defaultBounds)
            gmap.setZoom(defaultZoom)
        }
        else if($(this).attr('id') == 'near-me'){
            if(userMarker == null){
                getUserLocation(function(){
                    gmap.setCenter(userMarker.getPosition())
                    gmap.setZoom(13)
                })
            }
            else{
                gmap.setCenter(userMarker.getPosition())
                gmap.setZoom(13)

            }
        }
        else{
            zoomToZone($(this).attr('id'))
        }
    })


})