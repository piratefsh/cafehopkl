
$(document).ready(function(){
    //################################################ INITIALIZERS ###################################################
    function initializeTemplates(callback){
        //Header and footer
        $.get('templates/static-templates.html', function(templates){
            var header = $(templates).filter("#template-header").html()   
            var footer = $(templates).filter("#template-footer").html()   
            header = $(header).hide()

            $('body').prepend(header)
            $(header).slideDown(300)
            $('body').append(footer)
            $(footer).slideDown(300)
            
            callback()

        }, 'html')   

       
    }

    function templateInitializerCallback(){
        initializeResponsiveNav()

        setSocialMedia()
    }

    function setSocialMedia(){
        //Twitter
        !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');
    }

    function initializeResponsiveNav(){
        var navIconSelector = "#collapsed-nav-icon"
        $(navIconSelector).click(function(){
            var navList = $("nav ul")
            var speed = 'fast'
            if($(navList).hasClass('selected')){
                $(navList).hide(speed, function(){
                    $(this).removeClass('selected')
                })
            }
            else{
                $(navList).addClass('selected')
                $(navList).show(speed)
            }
        })
    }
    //###################################################### RUN CODE #####################################################
    initializeTemplates(templateInitializerCallback)



    //###################################################### GOOGLE ANALYTICS #####################################################
    // var _gaq=[['_setAccount','UA-43969265-1'],['_trackPageview']];
    // (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
    // g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
    // s.parentNode.insertBefore(g,s)}(document,'script'));
})