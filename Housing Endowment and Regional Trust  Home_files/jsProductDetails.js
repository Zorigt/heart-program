//-----------------------------------------------------------------------//
function productDetails(sProdCode)                                       //
//-----------------------------------------------------------------------//
//          function name: productDetails()                              //
//             created by: dbanks		                                 //
//             created on: 1/15/2004                                     //
//                purpose: Pop-up a product description window           //
//             parameters: sProdCode - the product to describe           //
//                returns: Nothing                                       //
// include files required: None                                          //
//-----------------------------------------------------------------------//
{
	
	var file;
	sProdCode = escape(sProdCode);
	file = "/choose/productDetails.asp?pr_code=" + sProdCode;

	productWindow = window.open(file,'productwin','toolbar=no,scrollbars=yes,width=610,height=550');
//--------------------------------------------------------------------------//
// Added this re-load statement to give the browser control in PWB more		//
// time to execute the creation of the popup.								//
// dbanks - 1/12/04															//
//--------------------------------------------------------------------------//
	setTimeout("productWindow.document.location.href='" + file + "';", 1000);
//--------------------------------------------------------------------------//
	productWindow.focus();

}


//end function productDetails(sProdCode)---------------------------------//


//-----------------------------------------------------------------------//
function productDetailsSamplePmt(sProdCode)                              //
//-----------------------------------------------------------------------//
//          function name: productDetailsSamplePmt()                     //
//             created by: pault		                                 //
//             created on: 10/24/2005                                    //
//                purpose: Pop-up a product description window with a    //
//						   ShowSamplePayment = true querystring addition //
//             parameters: sProdCode - the product to describe           //
//                returns: Nothing                                       //
// include files required: None                                          //
//-----------------------------------------------------------------------//
{
	
	var file;
	sProdCode = escape(sProdCode);
	file = "/choose/productDetails.asp?pr_code=" + sProdCode + "&ShowSamplePayment=true";

	productWindow = window.open(file,'productwin','toolbar=no,scrollbars=yes,width=610,height=550');
	productWindow.focus();
}


//end function productDetailsSamplePmt(sProdCode)------------------------//