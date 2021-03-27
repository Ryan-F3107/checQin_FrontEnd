import React from 'react';

export default class Validation extends React.Component {

    // Verify that the entered phone number has the correct form
    // automatically put "-" after the 3rd and 6th digits
    static validatePhoneNumber(numInputs) {
        var last = numInputs.charAt(numInputs.length - 1);

        numInputs = numInputs.replace(/[a-zA-Z!@#$%^&*()_=+;.,><?/'|]/gi, ''); // only number
        if (numInputs.charAt(numInputs.length - 1) == "-" && numInputs.charAt(numInputs.length - 2) == "-") {
            numInputs = numInputs.slice(0, -2)
        } else if (numInputs.charAt(numInputs.length - 1) == "-") {
            numInputs = numInputs.slice(0, -1)
        } else if (numInputs.length == 4) {
            numInputs = numInputs.substring(0, 3) + "-" + last
        } else if (numInputs.length == 8) {
            numInputs = numInputs.substring(0, 7) + "-" + last
        }
        return numInputs;
    }
    // Verify whether the capacity of a business is a positive integer
    static validateCapacity(capacityInput) {
        capacityInput = capacityInput.replace(/[^0-9]+/gi, '');
        return capacityInput;
    }

    static printPhoneNumErrorMessage(phoneNum) {
        // If the field is left blank, or has an invalid phone number, show an error message 
        var errorMessage = "";

        if (phoneNum == "") {
            errorMessage = "Required";

        } else if (phoneNum.match(/[0-9]/g).length != 10 || phoneNum.match(/-/g).length != 2) {
            errorMessage = "Invalid. Must have 10 digits";

        } else if (phoneNum.charAt(3) != "-" || phoneNum.charAt(7) != "-") {
            errorMessage = "Invalid. Must have 2 dashes. Please type slowly to include 2 dashes.";

        }
        return errorMessage;
    }

    static validateEmailAddress(email) {
        // If the field is left blank, or has an invalid email address, show an error message

        var errorMessage = "";

        if (email == "") { // If the field is empty
            errorMessage = "Required";

            // Less than 5 characters or doesn't have @ and . or if it contains a space
        } else if (email.length <= 5 || /[A-Za-z0-9]/.test(email.charAt(email.length - 1)) == false || /@\w+\.\w+/.test(email) == false || /\s+/.test(email)) {
            errorMessage = "Invalid";

        }
        return errorMessage;
    }
}