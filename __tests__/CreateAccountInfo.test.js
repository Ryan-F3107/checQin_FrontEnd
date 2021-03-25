import React from 'react';
import renderer from 'react-test-renderer';
import CreateAccountInfo from '../screens/CreateAccountInfo';

describe("<CreateAccountInfo />", () => {
    it("has 1 child", () => {
        const tree = renderer.create(<CreateAccountInfo />).toJSON();
        expect(tree.children.length).toBe(1);
    });

    it('renders correctly', () => {
        renderer.create(<CreateAccountInfo />);
    });

    it('CreateAccountInfo testing with snapshot', () => {
        const tree = renderer.create(<CreateAccountInfo />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});