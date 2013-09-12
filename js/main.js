
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
    initializeTemplates(initializeResponsiveNav)

    //###################################################### GOOGLE ANALYTICS #####################################################
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-43969265-1', 'cafehopkl.com');
      ga('send', 'pageview');

})