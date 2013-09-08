
$(document).ready(function(){
    //################################################ INITIALIZERS ###################################################
    function initializeTemplates(){
        //Header and footer
        $.get('templates/static-templates.html', function(templates){
            var header = $(templates).filter("#template-header").html()   
            var footer = $(templates).filter("#template-footer").html()   
            header = $(header).hide()
            $('body').prepend($(header))
            $(header).slideDown(300)
            $('body').append($(footer))
        }, 'html')   
    }

    //###################################################### RUN CODE #####################################################
    initializeTemplates()
})