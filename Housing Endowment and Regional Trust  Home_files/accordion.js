$(document).ready(function () {
    // Accordion
    $(".accordion > div:first").addClass("expanded");
    $(".accordion > div:not(:first)").addClass("collapsed").children("div").hide();

    $(".accordion h3").click(function () {
        if ($(this).parent("div").hasClass("expanded")) {
            $(this).parent("div").children("div").slideUp(400, function () {
                $(this).parent("div").removeClass("expanded").addClass("collapsed");
            });
        }
        else {
            $(".expanded").children("div").slideUp(400, function () {
                $(this).parent("div").removeClass("expanded").addClass("collapsed");
            });
            $(this).parent("div").removeClass("collapsed").addClass("expanded").children("div").slideDown();
        }
        return false;
    });

});