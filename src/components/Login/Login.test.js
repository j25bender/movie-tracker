/* eslint-disable */
import React from 'react';
import { shallow } from 'enzyme';
import { Login, mapDispatchToProps } from './Login';
import { getUser, login } from '../../actions/index';
import { fetchUser, fetchApi } from '../../helpers/helper';
import { createStore } from 'redux';
import rootReducer from '../../reducers/index';

let store = createStore(rootReducer)

describe('Login', () => {
    let mockfn;
    let wrapper;
    let mockData;

    beforeEach(() => {
        mockfn = jest.fn();
        mockData = [{title: 'Coco',
                     movie_id: 354912,
                     poster: 'https://image.jpg',
                     overview: "Despite..."
                   }]
        window.fetch = jest.fn().mockImplementation( (url) => {
            return Promise.resolve({
                status: 200,
                json: () => Promise.resolve({id: 3, name: 'bob', email: 'b@b.com', password: '12345'})
            })
        })
        wrapper = shallow(<Login handleSubmit={mockfn}
                                 handleLogin={false} 
                                 setFavorites={mockfn}
                                 getMovies={mockfn} />);        
    })
    
    it('matches the snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should fetch if status is <= 200 status', async () => {
        expect(window.fetch).not.toHaveBeenCalled();
        wrapper.setState({email: 'b@b.com', password: 'Bob123'});

        const mockHandleSubmit = jest.fn();
        const mockHandleLogin = jest.fn();
    
        wrapper = shallow(<Login handleSubmit={mockHandleSubmit} handleLogin={mockHandleLogin} />)

        wrapper.instance().validateLogin();

        expect(window.fetch).toHaveBeenCalled();
        // expect(mockHandleLogin).toHaveBeenCalled();

        // await wrapper.instance().markMoviesAsFavorites()
        // wrapper.fetchUser({name: "bob", password: "12345", email: "b@b.com"})  
        // expect(window.fetch).toHaveBeenCalled();
    })

    it.skip('should call validateLogin on submit', () => {

        expect(window.fetch).toHaveBeenCalled()

        
    })
});