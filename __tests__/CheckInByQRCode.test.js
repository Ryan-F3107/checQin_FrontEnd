import React from 'react';
import renderer from 'react-test-renderer';
import CheckInByQRCode from '../screens/customerScreens/CheckInByQRCode';

describe("<CheckInByQRCode />", () => {
    it("has 2 children", () => {
        const tree = renderer.create(<CheckInByQRCode />).toJSON();
        expect(tree.children.length).toBe(2);
    });

    it('renders correctly', () => {
        renderer.create(<CheckInByQRCode />);
    });

    it('HelpMyQRCode testing with snapshot', () => {
        const tree = renderer.create(<CheckInByQRCode />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});