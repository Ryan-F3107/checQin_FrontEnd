import React from 'react';
import renderer from 'react-test-renderer';
import {validatePhoneNumber} from '../functions/Validation';


describe("Validating Phone Number function", () => {
    test("10 numeric digits, 2 dashes", () => {

        expect(validatePhoneNumber("1")).toEqual("1");

    });
});