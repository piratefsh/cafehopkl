
$(document).ready(function(){
    //################################################ INITIALIZERS ###################################################
    function initializeTemplates(callback){
        //Header and footer
        $.get('templates/static-templates.html', function(templates){
            var header = $(templates).filter("#template-header").html()   
            var footer = $(templates).filter("#template-footer").html()   
            header = $(header).hide()
            $('body').prepend($(header))
            $(header).slideDown(300)
            $('body').append($(footer))
            
            callback()

        }, 'html')   

       
    }

    function initializeResponsiveNav(){
        console.log("holla")
        var navIconSelector = "#collapsed-nav-icon"
        $(navIconSelector).click(function(){
            var navList = $("nav ul")
            $(navList).toggleClass("open")
        })
    }
    //###################################################### RUN CODE #####################################################
    initializeTemplates(initializeResponsiveNav)
})