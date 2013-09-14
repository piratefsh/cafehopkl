//Google Maps
var APIkey = "AIzaSyBSPJm_l1q0JWgK6ZhJNzjwmQ4-pFJxkzc"
var kmlSrc = "js/chkl.kml"
// var kmlSrc = "http://maps.google.com.my/maps/ms?ie=UTF8&authuser=0&msa=0&output=kml&msid=215254376920118074950.0004c7c0fe5b02177d447"

var searchBarSelector 		= "input#search-bar"
var listToSearchSelector 	= "ul#locations"
var locationsListSelector 	= 'ul#locations'
var divWithLocationsListSelector = 'div#locations-list'
var chklBaseUrl				= "/"			

var chklDomain              = "http://cafehopkl.com/"

var participatingCafesListSelector  = "ul#participating-cafes-list"

var cafeTypesIcons = new Array()
var cafeTypesIconsDir = chklBaseUrl + "img/cafe-type-icons/"
cafeTypesIcons['espresso']  = cafeTypesIconsDir + "espresso.png"
cafeTypesIcons['handbrew']  = cafeTypesIconsDir + "handbrew.png"
cafeTypesIcons['pastryOnly']= cafeTypesIconsDir + "pastryOnly.png"
cafeTypesIcons['lunch']     = cafeTypesIconsDir + "lunch.png"
cafeTypesIcons['dinner']    = cafeTypesIconsDir + "dinner.png"
