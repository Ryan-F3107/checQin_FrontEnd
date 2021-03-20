import React from 'react';

export default class Validation extends React.Component {

    // Verify that the entered phone number has the correct form
    // automatically put "-" after the 3rd and 6th digits
    static validatePhoneNumber(numInputs) {
        var last = numInputs.charAt(numInputs.length - 1);

        numInputs = numInputs.replace(/[a-zA-z!@#$%^&*()_=+;.,><?/'|]/gi, ''); // only number
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
}