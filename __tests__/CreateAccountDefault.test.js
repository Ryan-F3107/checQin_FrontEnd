import React from 'react';
import renderer from 'react-test-renderer';
import CreateAccountDefault from '../screens/customerScreens/CreateAccountDefault';

describe("<CreateAccountDefault />", () => {
    it("has 1 child", () => {
        const tree = renderer.create(<CreateAccountDefault />).toJSON();
        expect(tree.children.length).toBe(1);
    });

    it('renders correctly', async() => {
        renderer.create(<CreateAccountDefault />);
    });

    it('CreateAccountDefault testing with snapshot', () => {
        const tree = renderer.create(<CreateAccountDefault />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});