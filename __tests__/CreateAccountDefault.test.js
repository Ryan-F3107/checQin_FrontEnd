import React from 'react';
import renderer from 'react-test-renderer';
import CreateAccountDefault from '../screens/CreateAccountDefault';

describe("<CreateAccountDefault />", () => {
    it("has 11 children", () => {
        const tree = renderer.create(<CreateAccountDefault />).toJSON();
        expect(tree.children.length).toBe(11);
    });

    it('renders correctly', async() => {
        renderer.create(<CreateAccountDefault />);
    });

    it('CreateAccountDefault testing with snapshot', () => {
        const tree = renderer.create(<CreateAccountDefault />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});