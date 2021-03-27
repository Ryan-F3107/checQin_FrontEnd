import React from 'react';
import renderer from 'react-test-renderer';
import DeleteAccount from '../screens/DeleteAccount';

describe("<DeleteAccount />", () => {
    it("has 2 children", () => {
        const tree = renderer.create(<DeleteAccount />).toJSON();
        expect(tree.children.length).toBe(2);
    });

    it('renders correctly', () => {
        renderer.create(<DeleteAccount />);
    });

    it('HelpMyQRCode testing with snapshot', () => {
        const tree = renderer.create(<DeleteAccount />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});