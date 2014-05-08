//-----------------------------------------------------------------------//
function Assumptions()                                           //
//-----------------------------------------------------------------------//
//          function name: Assumptions()                                 //
//             created by: Josh Leonard                                  //
//             created on: 10/7/2008                                     //
//                purpose: Pop-up a rate assumptions                     //
//                returns: Nothing                                       //
// include files required: None                                          //
//-----------------------------------------------------------------------//
{
    var file;
    file = "/Assumptions.asp"
    
    msgWindow = window.open(file,'assumptionswin','toolbar=no,scrollbars=yes,width=550,height=350');

    // This statement gives the browser control more
    // time to execute the creation of the popup.
    setTimeout("msgWindow.document.location.href='" + file + "';", 1000);

    msgWindow.focus();

}   // Assumptions