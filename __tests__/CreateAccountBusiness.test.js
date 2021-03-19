import React from 'react';
import renderer from 'react-test-renderer';
import CreateAccountBusiness from '../screens/CreateAccountBusiness';

describe("<CreateAccountBusiness />", () => {
    it("has 3 children", () => {
        const tree = renderer.create(<CreateAccountBusiness />).toJSON();
        expect(tree.children.length).toBe(3);
    });

    it('renders correctly', async() => {
        renderer.create(<CreateAccountBusiness />);
    });

    it('CreateAccountBusinesstesting with snapshot', () => {
        const tree = renderer.create(<CreateAccountBusiness />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});