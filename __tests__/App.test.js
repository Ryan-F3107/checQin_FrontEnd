import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App';

describe("<App />", () => {    
    it('renders correctly', () => {
        renderer.create(<App />);
    });
    
    it('App testing with snapshot', () => {
        const tree = renderer.create(<App />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});