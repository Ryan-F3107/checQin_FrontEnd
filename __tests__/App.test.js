//import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App';

// Note: test renderer must be required after react-native.


describe("<App />", () => {    
    it('renders correctly', () => {
        renderer.create(<App />);
    });
    
    it('App testing with snapshot', () => {
        const tree = renderer.create(<App />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});