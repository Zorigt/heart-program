function loanPurposeChange()
{
	var frm = document.applyform;
	var sIndicators = frm.StatesQuestionIndicators.value;
	var sCurrentPurpose;
	var bShouldRefresh = false;
	
	// If only first mortgages are enabled, we already
	// have the states displayed as they should be - exit
	if ( frm.onlyFirsts.value == "Y" )
	{
		return;
	}
	
	for ( var i = 0; i < frm.la_purpose.length; i++ )
	{
		if ( frm.la_purpose[i].checked )
		{
			sCurrentPurpose = frm.la_purpose[i].value;
		}
	}

	// if no change in purpose, just return
	if (sCurrentPurpose == frm.originalPurpose.value)
		return;
		
	// If the purpose has a state question associated with it, refresh to show
	if(sIndicators.indexOf(sCurrentPurpose)!= -1){
		bShouldRefresh = true;
	}
	
	// If the purpose has no question associated, but a question is currently showing, refresh to remove
	if(!bShouldRefresh && frm.StatesQuestionDisplayed.value == "Y"){
		bShouldRefresh = true;
	}

	// if loan purpose of purchase and RES is enabled, refresh to show RES question
	if (!bShouldRefresh && frm.DisplayRESQuestion.value == "Y" && (sCurrentPurpose == "1" || frm.originalPurpose.value == "1"))
	{
		bShouldRefresh = true;
	}
	
	if(bShouldRefresh){
		document.applyform.action = "/apply.asp";
		document.applyform.submit();
	}
}

function Continue() {
    if (IsInputValid()) {
        document.applyform.submit();
    };
};

function isReadyToContinue() {
    var isReady = true;
    var inputField = null;

    inputField = document.getElementById('radioNonEligible');
    if (typeof inputField != 'undefined' && inputField != null) {
        isReady = isReady && !inputField.checked;
    };

    inputField = document.getElementById('stateCountyNo');
    if (typeof inputField != 'undefined' && inputField != null) {
        isReady = isReady && (inputField.style.display != 'none' && !inputField.checked);
    };

    inputField = document.getElementById('stateCounties');
    if (typeof inputField != 'undefined' && inputField != null) {
    	var code = $(inputField).val();
    	isReady = isReady && code != -1;
    	if (code != -1 && code != 0)
    		$('#LoanWizardState').val(code);
    };

    if (isReady) {
        $('#contactUsButton').hide();
        $('#applyContinueButton').show();
    }
    else {
        $('#contactUsButton').show();
        $('#applyContinueButton').hide();
    };

    return isReady;
};

function SubmitIfValid() {

    var isValid = true;
    var focusField = null;
    var inputField = null;
    var message = '';

    var inputFields = document.getElementsByName('eligible');
    if (inputFields != null && inputFields.length > 1) {
        if (!inputFields[0].checked && !inputFields[1].checked) {
            message += 'Please confirm your membership\n';
            isValid = false;
            focusField = focusField || inputFields[0];
        }
        else if (inputFields[1].checked) {

            window.location = 'scripts/contact.asp';
            return false;

        };
    };

    inputField = document.getElementById('loanPurpose');
    if (inputField != null) {
        if (inputField.selectedIndex < 1) {
            message += 'Please select a purpose for the loan\n';
            isValid = false;
            focusField = focusField || inputField;
        };
    };

    inputField = document.getElementById('stateCountyYesNo');
    if (inputField != null) {
        if (inputField.style.display != 'none') {
            inputFields = document.getElementsByName('stateCounty');
            if (inputFields != null && inputFields.length > 1) {
                if (!inputFields[0].checked && !inputFields[1].checked) {
                    message += 'Please indicate your relationship to the listed states or counties\n';
                    isValid = false;
                    focusField = focusField || inputFields[0];
                }
                else if (inputFields[1].checked) {

                    window.location = 'scripts/contact.asp';
                    return false;

                };
            };
        }
        else {

            inputField = document.getElementById('stateCounties');

            if (inputField.selectedIndex < 1 && inputField.style.display != 'none') {

                message += 'Please indicate the state or county the property is in\n';
                isValid = false;
                focusField = focusField || inputField;

            };
        };
    };

    inputFields = document.getElementsByName('PlaceRESOrder');
    if (inputFields != null && inputFields.length > 1) {
        inputField = document.getElementById('loanPurpose');
        if (inputField.value == "1") {
            if (!inputFields[0].checked && !inputFields[1].checked) {
                message += 'Please select yes or no\n';
                isValid = false;
                focusField = focusField || inputFields[0];
            };
        };
    };

    if (!isValid) {

        //
        // they only want one error message displayed at time
        // so split out the first message:
        //
        //alert(message);
        alert(message.split('\n')[0]);

        if (typeof focusField.focus != 'undefined') {
            focusField.focus();
        };
        if (typeof focusField.select != 'undefined') {
            focusField.select();
        };
    }
    else {
        var b = document.getElementById('continueButton');
        if (b != null) {
            if (typeof b.disabled != 'undefined') {
                b.disabled = true;
                b.style.cursor = 'wait';
            };
        };
        document.applyform.submit();
    };

};

function doForgotPassword() {
    var inputField = document.getElementById('username');
    if (inputField.value.length == 0) {
        alert('Please enter your Username');
        inputField.focus();
        return false;
    }
    else {
        window.location = 'WebUI/Consumer/ConsumerLogin/GenerateTemporaryPassword.aspx?loginId=' + encodeURI(inputField.value);
        return true;
    };
};

function LoginIfValid() {

    var isValid = true;
    var focusField = null;
    var inputField = document.getElementById('username');
    var message = '';

    if (inputField.value.length == 0) {
        message += 'Please enter your Username\n';
        isValid = false;
        focusField = focusField || inputField;
    }
    else if (inputField.value.length < 5) {
        message += 'Username must be at least 5 alpha/numeric characters long\n';
        isValid = false;
        focusField = focusField || inputField;
    }
    else if (inputField.value.match(/\s/g) != null) {
        message += 'Username must not contain any spaces\n';
        isValid = false;
        focusField = focusField || inputField;
    };

    inputField = document.getElementById('txtPassword');
    if (inputField.value.length == 0) {
        isValid = false;
        message += 'Please enter your password.\n';
        focusField = focusField || inputField;
    }
    else if (inputField.value.match(/\s/g) != null) {
        isValid = false;
        message += 'Password must not contain any spaces\n';
        focusField = focusField || inputField;
    };


    if (!isValid) {
        //
        // they only want one error message displayed at time
        // so split out the first message:
        //
        //alert(message);
        alert(message.split('\n')[0]);

        focusField.focus();
        focusField.select();
    }
    else {
        var p = document.getElementById('passwordAgain');
        //
        // assuming the password field was the last inputField variable!
        //
        p.value = inputField.value;

        var b = document.getElementById('loginButton');
        b.disabled = true;
        b.style.cursor = 'wait';

        document.login.submit();
    };

};

function showStatesForLoanPurpose(purposeId, siteId) {

    var sc = document.getElementById('stateCounties');
    sc.style.display = '';

    while (sc.hasChildNodes()) {
        sc.removeChild(sc.lastChild);
    };

    var j = purposeProvince.length;
    var s = null;

    while (j-- > 0) {
        if (purposeProvince[j].purposeId == purposeId) {

            document.getElementById('serviceUnavailableInYourArea').style.display = 'none';

            document.getElementById('stateCountyNo').checked = false;

            s = document.createElement('option');
            s.value = 0;
            s.appendChild(document.createTextNode(''));
            sc.appendChild(s);

            document.getElementById('stateCountyYesNo').style.display = 'none';

            var lbl = document.getElementById('stateCountyQuestion');
			var numberOfStates = purposeProvince[j].states.length;
			var loanWizardState = document.getElementById('LoanWizardState').value;

            if (numberOfStates > 1) {
                sc.style.display = '';
                document.getElementById('stateCountyYesNo').style.display = 'none';

                for (var i = 0; i < numberOfStates; i++) {
                    s = document.createElement('option');
                    s.appendChild(document.createTextNode(purposeProvince[j].states[i].name));
                    s.value = purposeProvince[j].states[i].code;

                    if (loanWizardState != "" && s.value == loanWizardState)
                    	s.selected = true;
					else if (loanWizardState == "" && purposeProvince[j].states[i].isDefault) {
                    	s.selected = true;
                    };

                    sc.appendChild(s);
                };

                if (numberOfStates < purposeProvince[j].numberOfStatesAvailable) {
                    s = document.createElement('option');
                    s.value = -1;
                    s.appendChild(document.createTextNode('None of the above'));
                    sc.appendChild(s);
                };

                while (lbl.hasChildNodes()) {
                    lbl.removeChild(lbl.lastChild);
                };

                lbl.appendChild(document.createTextNode('What State is the property located in?'));
            }
            else if (numberOfStates == 1) {
                sc.style.display = 'none';
                document.getElementById('stateCountyYesNo').style.display = '';

                while (lbl.hasChildNodes()) {
                    lbl.removeChild(lbl.lastChild);
                };

                lbl.appendChild(document.createTextNode('Is the property located in ' + purposeProvince[j].states[0].name + '?'));
            }
            else {
                document.getElementById('stateCountyQuestion').style.display = 'none';
                document.getElementById('stateCountyYesNo').style.display = 'none';
                sc.style.display = 'none';
            };
        };
    };

};

function showCountiesForLoanPurpose(purposeId, siteId) {

    var sc = document.getElementById('stateCounties');
    sc.style.display = '';

    while (sc.hasChildNodes()) {
        sc.removeChild(sc.lastChild);
    };

    var j = purposeProvince.length;
    var s = null;

    while (j-- > 0) {
        if (purposeProvince[j].purposeId == purposeId) {

            document.getElementById('serviceUnavailableInYourArea').style.display = 'none';
            document.getElementById('stateCountyNo').checked = false;

            s = document.createElement('option');
            s.value = 0;
            s.appendChild(document.createTextNode(''));
            sc.appendChild(s);

            document.getElementById('stateCountyYesNo').style.display = 'none';

            var lbl = document.getElementById('stateCountyQuestion');
            var numberOfCounties = purposeProvince[j].counties.length;
            var loanWizardState = document.getElementById('LoanWizardState').value;

			if (numberOfCounties > 1) {
				sc.style.display = '';
				document.getElementById('stateCountyYesNo').style.display = 'none';

				for (var i = 0; i < numberOfCounties; i++) {
					s = document.createElement('option');
					s.value = purposeProvince[j].counties[i].code;

					if (loanWizardState != "" && s.value == loanWizardState)
						s.selected = true;
					else if (loanWizardState == "" && purposeProvince[j].counties[i].isDefault) {
						s.checked = true;
					};

					s.appendChild(document.createTextNode(purposeProvince[j].counties[i].name));
					sc.appendChild(s);
				};

				s = document.createElement('option');
				s.value = -1;
				s.appendChild(document.createTextNode('None of the above'));
				sc.appendChild(s);

				while (lbl.hasChildNodes()) {
					lbl.removeChild(lbl.lastChild);
				};

				lbl.appendChild(document.createTextNode('What County is the property located in?'));
			}
			else if (numberOfCounties == 1) {
				sc.style.display = 'none';
				document.getElementById('stateCountyYesNo').style.display = '';

				while (lbl.hasChildNodes()) {
					lbl.removeChild(lbl.lastChild);
				};

				lbl.appendChild(document.createTextNode('Is the property located in ' + purposeProvince[j].counties[0].name + ' county?'));
			}
			else {
				document.getElementById('stateCountyQuestion').style.display = 'none';
				document.getElementById('stateCountyYesNo').style.display = 'none';
				sc.style.display = 'none';
			};
        };
    };
};

$(document).ready(function () {

    $('#radioElgible').click(function () {
        isReadyToContinue();
        return true;
    });

    $('#radioNonElgible').click(function () {
        isReadyToContinue();
        return true;
    });

    var b = document.getElementById('continueButton');
    if (b != null) {
        if (typeof b.disabled != 'undefined') {
            b.disabled = false;
        };
        b.style.cursor = 'pointer';
    };

});