import React from 'react';
import renderer from 'react-test-renderer';
import AboutMyQRCode from '../screens/businessScreens/AboutMyQRCode';

describe("<AboutMyQRCode />", () => {
    it("has 4 children", () => {
        const tree = renderer.create(<AboutMyQRCode />).toJSON();
        expect(tree.children.length).toBe(4);
    });

    it('renders correctly', () => {
        renderer.create(<AboutMyQRCode />);
    });

    it('AboutMyQRCode testing with snapshot', () => {
        const tree = renderer.create(<AboutMyQRCode />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});