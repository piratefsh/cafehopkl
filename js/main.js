
$(document).ready(function(){
    //################################################ INITIALIZERS ###################################################
    function initializeTemplates(callback){
        //Header and footer
        $.get('templates/static-templates.html', function(templates){
            var header = $(templates).filter("#template-header").html()   
            var footer = $(templates).filter("#template-footer").html()   
            header = $(header).hide()

            $('body').append($(footer))
            $('body').prepend($(header))
            $(header).slideDown(300)
            
            callback()

        }, 'html')   

       
    }

    function initializeResponsiveNav(){
        var navIconSelector = "#collapsed-nav-icon"
        $(navIconSelector).click(function(){
            var navList = $("nav ul")
            $(navList).toggleClass("open")
        })
    }
    //###################################################### RUN CODE #####################################################
    initializeTemplates(initializeResponsiveNav)
})