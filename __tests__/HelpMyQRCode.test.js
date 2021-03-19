import React from 'react';
import renderer from 'react-test-renderer';
import HelpMyQRCode from '../screens/businessScreens/HelpMyQRCode';

describe("<HelpMyQRCode />", () => {
    it("has 2 children", () => {
        const tree = renderer.create(<HelpMyQRCode />).toJSON();
        expect(tree.children.length).toBe(2);
    });

    it('renders correctly', () => {
        renderer.create(<HelpMyQRCode />);
    });

    it('HelpMyQRCode testing with snapshot', () => {
        const tree = renderer.create(<HelpMyQRCode />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});