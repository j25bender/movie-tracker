import React, { Component } from 'react';
import Card from '../Card/Card';
import { connect } from 'react-redux';
import { getMoviesFromApi } from '../../actions/index.js';
import Main from './Main'

Enzyme.configure({ adapter: new Adapter() });

describe('Main', () => {
    it('matches the snapshot', () => {
        const wrapper = shallow(<Main />);
        
        expect(wrapper).toMatchSnapshot();
    }); 
});