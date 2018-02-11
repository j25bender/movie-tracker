/* eslint-disable */
import React from 'react';
import { shallow } from 'enzyme';
import { Login, mapDispatchToProps } from './Login';
import { filteredMovieData } from '../../helpers/mockData';
import { getUser, login } from '../../actions/index';
import * as helper from '../../helpers/helper';
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
                                 handleLogin={mockfn} 
                                 setFavorites={mockfn}
                                 getMovies={mockfn}
                                 movieData={filteredMovieData} />);        
    })
    
    it('matches the snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });

    describe('validateLogin', () => {
        it('should fetch if status is less than 200', async () => {
            window.fetch = jest.fn().mockImplementation( (url) => {
            return Promise.resolve({
                status: 200,
                json: () => Promise.resolve({ data: filteredMovieData })
            })
        })
            expect(window.fetch).not.toHaveBeenCalled();
            helper.fetchUser = jest.fn().mockImplementation(() => {
                return window.fetch()
            })
            helper.fetchApi = jest.fn().mockImplementation(() => {
                return { data: filteredMovieData };
            })
            wrapper.instance().validateLogin();
            expect(window.fetch).toHaveBeenCalled();
        })
    })


    it.skip('should call validateLogin on submit', () => {

        expect(window.fetch).toHaveBeenCalled()

        
    })
});