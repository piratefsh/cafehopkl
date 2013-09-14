$(document).ready(function(){

      //([a-zA-Z0-9_-\s]*?)(\.)(jpg|png|ai|pdf|tif|psd)(\s*)

    //"$1$2$3", \n
    var logoDir = "img/cafe-logos/"
    var logoNames = [
       "Aku-Cafe-Logo.png",
        "GrandeurLogoFinal2.png",
        "BrewBread.png",
        "HostShots-Logo.png",
        "BricksLogo.png",
        "LOKLFA_logo_rooster.png",
        "ButterBeans-Logo.png",
        "My-espresso.png",
        "Caffeine.png",
        "RAW-Coffee-Logo.png",
        "Coffee-Familie-LOgo.png",
        "RBB-thick.png",
        "CoffeeSociete.png",
        "RoyalPost-Logo.png",
        "Departure-Lounge-highres.png",
        "TBC-logo.png",
        "Dotz_logo.png",
        "Whisk-Espresso-Bar.png",
        "Epiphany-Logo--new-lightbulb-2.png",
        "awaitcafe_logo.png",
        "Exhibit-Cafe_High-Res-Logo.png",
        "haikara-style-cafe.png",
        "Food-Foundry-Logo.png",
        "moontree_v2.png",
    ]

    $.get(chklBaseUrl + 'js/cafes.json', function(data){
        var cafes = data.cafes
        for(var i = 0; i < cafes.length; i++){
            var logoName = cafes[i].logo
            var logo = $("<a target='_blank' href='" + cafes[i].site + "'>")

            if(logoName){
                var img = $("<img/>").attr('src', logoDir + logoName).attr('alt', cafes[i].name)
                logo.append(img)
            }
            else{
                logo.append(cafes[i].name)
            }
            
            var logoDiv = $("<div>").attr("class", "logo").append(logo)
            var cafe = $("<div>").attr("class", "cafe").append(logoDiv)
            var li = $("<li>").append(cafe)
            $(participatingCafesListSelector).append(li)    
        }
    }, 'json')
})