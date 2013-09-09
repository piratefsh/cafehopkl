$(document).ready(function(){

      //([a-zA-Z0-9_-\s]*?)(\.)(jpg|png|ai|pdf|tif|psd)(\s*)

    //"$1$2$3", \n
    var logoDir = "img/cafe-logos/"
    var logoNames = [
        "Aku-Cafe-Logo.png", 
        "GrandeurLogoFinal2.png", 
        "BricksLogo.png", 
        "LOKLFA_logo_rooster.png", 
        "ButterBeans-Logo.png", 
        "RAW-Coffee-Logo.png", 
        "Coffee-Familie-LOgo.png", 
        "RBB-thick.png", 
        "Departure-Lounge-highres.png", 
        "RoyalPost-Logo.png", 
        "Dotz_logo.png", 
        "TBC-logo.png", 
        "Epiphany-Logo--new-lightbulb-2.png", 
        "awaitcafe_logo.png", 
        "Exhibit-Cafe_High-Res-Logo.png", 
        "moontree_v2.png", 
        "Food-Foundry-Logo.png", 

    ]

    logoNames.sort(function(a, b){
        return a.toUpperCase().localeCompare(b.toUpperCase())
    })

    for(var i = 0; i < logoNames.length; i++){
        var logo = $("<img/>").attr('src', logoDir + logoNames[i])
        var logoDiv = $("<div>").attr("class", "logo").append(logo)
        var cafe = $("<div>").attr("class", "cafe").append(logoDiv)
        var li = $("<li>").append(cafe)
        $(participatingCafesListSelector).append(li)
    }
})