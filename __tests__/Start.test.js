import React from 'react';
import renderer from 'react-test-renderer';
import Start from '../screens/Start';

describe("<Start />", () => {
    it("has 4 children", () => {
        const tree = renderer.create(<Start />).toJSON();
        expect(tree.children.length).toBe(4);
    });

    it('renders correctly', () => {
        renderer.create(<Start />);
    });

    it('Start testing with snapshot', () => {
        const tree = renderer.create(<Start />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});