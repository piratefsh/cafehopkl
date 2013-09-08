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

    for(var i = 0; i < logoNames.length; i++){
        var li = $("<li>").append($("<img/>").attr('src', logoDir+logoNames[i]))
        $(participatingCafesListSelector).append(li)
    }
})