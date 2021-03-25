import React from 'react';
import renderer from 'react-test-renderer';
import ChangePassword from '../screens/ChangePassword';

describe("<ChangePassword />", () => {
    it("has 1 child", () => {
        const tree = renderer.create(<ChangePassword />).toJSON();
        expect(tree.children.length).toBe(1);
    });

    it('renders correctly', () => {
        renderer.create(<ChangePassword />);
    });

    it('ChangePassword testing with snapshot', () => {
        const tree = renderer.create(<ChangePassword />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});