//-----------------------------------------------------------------------//
function glossary(sTerm, iVar)                                           //
//-----------------------------------------------------------------------//
//          function name: glossary()                                   //
//             created by: Jesse Kallhoff                                //
//             created on: 9/28/2001                                     //
//                purpose: Pop-up a glossary window                      //
//             parameters: sTerm - the Term to define                    //
//                returns: Nothing                                       //
// include files required: None                                          //
//-----------------------------------------------------------------------//
{
	
var file;
sTerm = escape(sTerm)
file = "/glossary/glossary.asp?sTerm=" + sTerm;


if(sTerm == "all")
{
msgWindow = window.open(file,'glossarywin','toolbar=no,scrollbars=yes,width=550,height=600');
}
else
{
	if(iVar == 1 || iVar == 2 || iVar == 3 || iVar == 4)
        {
		file = "/glossary/glossary.asp?sTerm=" + sTerm + "&iVar=" + iVar;

	}

msgWindow = window.open(file,'glossarywin','toolbar=no,scrollbars=yes,width=550,height=150');
//--------------------------------------------------------------------------//
// Added this re-load statement to give the browser control in PWB more		//
// time to execute the creation of the popup.								//
// dbanks - 1/12/04															//
//--------------------------------------------------------------------------//
setTimeout("msgWindow.document.location.href='" + file + "';", 1000);
//--------------------------------------------------------------------------//
}
msgWindow.focus();

}


//End function glossary(sTerm)-------------------------------------------//