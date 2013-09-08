$(document).ready(function(){
    var logoDir = "img/cafe-logos/"
    var logoNames = [
        "Aku Cafe Logo.jpg", 
        "ButterBeans Logo.ai", 
        "Dotz_logo.psd", 
        "Exhibit Cafe_High Res Logo.tif", 
        "LOKLFA_logo_rooster.ai", 
        "RBB thick.jpg", 
        "awaitcafe_logo.pdf", 
        "Coffee Familie LOgo.jpg", 
        "Dotz_logo.tif", 
        "Food Foundry Logo.ai", 
        "moontree_v2.jpg", 
        "RoyalPost Logo.png", 
        "BricksLogoOri2.0.ai", 
        "Departure Lounge highres.jpg", 
        "Epiphany Logo- new lightbulb 2.ai", 
        "GrandeurLogoFinal2.pdf", 
        "RAW Coffee Logo.ai", 
        "TBC_logo.ai", 
    ]

    for(var i = 0; i < logoNames.length; i++){
        var li = $("<li>").append($("<img/>").attr('src', logoDir+logoNames[i]))
        $(participatingCafesListSelector).append(li)
    }
})