
$(document).ready(function(){
    var header = {mainTitle: "Hello World"}
    var templateScript = $("#header").html()

    var template = Handlebars.compile(templateScript)
    var html = template(header)

    $('body').append(html)
})