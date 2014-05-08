function popUpTerm(term, width, height) {
    var w = null;
    if (typeof window.screen != 'undefined') {
        var x = Math.floor((window.screen.height - height) * 0.5) - 32;
        var y = Math.floor((window.screen.width - width) * 0.5) - 16;

        w = window.open('/popupterm.asp?Term=' + term, 'Term', 'toolbar=no,scrollbars=yes,width=' + width + ',height=' + height + ',top=' + y + ',left=' + x);
    }
    else {
        w = window.open('/popupterm.asp?Term=' + term, 'Term', 'toolbar=no,scrollbars=yes,width=' + width + ',height=' + height);
    };

    if (typeof w.focus != 'undefined') {
        w.focus();
    };
    return false;
};
function popUp(url, width, height) {
    var w = null;
    if (typeof window.screen != 'undefined') {
        var x = Math.floor((window.screen.height - height) * 0.5) - 32;
        var y = Math.floor((window.screen.width - width) * 0.5) - 16;

        w = window.open(url, '', 'toolbar=no,scrollbars=yes,width=' + width + ',height=' + height + ',top=' + y + ',left=' + x);
    }
    else {
        w = window.open(url, '', 'toolbar=no,scrollbars=yes,width=' + width + ',height=' + height);
    };

    if (typeof w.focus != 'undefined') {
        w.focus();
    };
    return false;
};
