/*************************************************
Name:	FocusFirstAndSelectAuto()
Purpose:Sets focus on the first form element, on
the first form on the page.  
**************************************************/
function FocusFirstAndSelectAuto()
{
	for( var a = 0; a < document.forms.length; a++ )
	{
		var frm = document.forms[a];	
		var length = frm.length;
		for(i=0; i<length; i++)
		{
		    if (typeof frm.elements[i].name != 'undefined' &&
                frm.elements[i].name.indexOf("ddlLoanId") < 0 && 
                frm.elements[i].name.indexOf("filterCol") < 0)
			{		
				if(frm.elements[i].type != "hidden" && frm.elements[i].disabled == false && (frm.elements[i].enabled == true || frm.elements[i].enabled == undefined))
				{
					//Need to check the parent elements to make sure the element isn't in a hidden <DIV> tag
					var oParEl = frm.elements[i].parentNode;
					var bFocus = true;
					// while parent node exists and isn't body or html tag
					while (oParEl) 
					{
						if ((oParEl.tagName == "BODY") || (oParEl.tagName == "HTML")) 
						{
							break;
						}
						// The parent node is hiddden this so this element is no good.
						if ((oParEl.style.display == "none") || (oParEl.style.visibility == "hidden")) 
						{
							bFocus = false;
							break;
						}
						// climb up DOM tree
						oParEl = oParEl.parentNode;
					}
					if (bFocus)
					{
						frm.elements[i].focus();
						if (frm.elements[i].type == "text" || frm.elements[i].type == "select")
						{
							frm.elements[i].select();
						}
						return;
					}
				}
			}
			
		}
	}
}