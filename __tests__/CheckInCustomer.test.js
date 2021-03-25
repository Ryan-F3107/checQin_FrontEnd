import React from 'react';
import renderer from 'react-test-renderer';
import CheckInCustomer from '../screens/businessScreens/CheckInCustomer';

describe("<CheckInCustomer />", () => {
    it("has 1 child", () => {
        const tree = renderer.create(<CheckInCustomer />).toJSON();
        expect(tree.children.length).toBe(1);
    });

    it('renders correctly', () => {
        renderer.create(<CheckInCustomer />);
    });

    it('CheckInCustomer testing with snapshot', () => {
        const tree = renderer.create(<CheckInCustomer />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});