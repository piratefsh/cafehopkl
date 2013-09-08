$(document).ready(function(){

    $(searchBarSelector).keyup(function(){

        //Hide all
        $(listToSearchSelector + " li").hide()

        //Select and Show matching entries 
        if($(this).val().length > 0){
            var matchingItems = $("li:contains-ci('" + $(this).val() + "')", $(listToSearchSelector))
            matchingItems.show()
        }
        else{
            $(listToSearchSelector + " li").show()    
        }

        //Update scrollbar to new height of list
        $(divWithLocationsListSelector).mCustomScrollbar("update")

        //Scroll to top
        $(divWithLocationsListSelector).mCustomScrollbar("scrollTo", "top")

    })


    //JQuery extension for case insensitive filter
    $.extend($.expr[":"],
    {
    "contains-ci": function(elem, i, match, array)
    {
        return (elem.textContent || elem.innerText || $(elem).text() || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
    }
});
})