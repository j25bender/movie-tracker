/* eslint-disable */
import React from 'react';
import { shallow } from 'enzyme';
import { Login, mapDispatchToProps } from './Login';
import { filteredMovieData, movieDataSansFavs } from '../../helpers/mockData';
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
        beforeEach(() => {
            window.fetch = jest.fn().mockImplementation( (url) => {
            return Promise.resolve({
                status: 200,
                json: () => Promise.resolve({ data: filteredMovieData })
                })
            })
            helper.fetchUser = jest.fn().mockImplementation(() => {
                return window.fetch()
            })
            helper.fetchApi = jest.fn().mockImplementation(() => {
                return { data: filteredMovieData };
            })
        })

        it('should fetch if status is less than 200', async () => {
            wrapper.instance().validateLogin();
            expect(window.fetch).toHaveBeenCalled();
        })

        it('calls loadFavorites, handleLogin, and handleSubmit if user email and password match', async () => {
            wrapper.instance().loadFavorites = jest.fn()
            expect(wrapper.instance().props.handleLogin).not.toHaveBeenCalled();
            expect(wrapper.instance().props.handleSubmit).not.toHaveBeenCalled();
            expect(wrapper.instance().loadFavorites).not.toHaveBeenCalled();
            
            await wrapper.instance().validateLogin();

            expect(wrapper.instance().props.handleLogin).toHaveBeenCalled();
            expect(wrapper.instance().props.handleSubmit).toHaveBeenCalled();
            expect(wrapper.instance().loadFavorites).toHaveBeenCalled();
        })
    })

    describe('markMoviesAsFavorites', () => {
        it('adds a favorites property to all movies passed in', () => {
            expect(wrapper.instance().markMoviesAsFavorites(movieDataSansFavs)[0])
            .toEqual(filteredMovieData[0])
        })
    })

    describe('markFavsAsFavorites', () => {
        it('adds a favorites property to all movies passed in', () => {
            expect(wrapper.instance().markFavsAsFavorites(movieDataSansFavs)[0])
            .toEqual(filteredMovieData[0])
        })
    })

    describe('matchStateToProps', () => {
        
    })

    describe('matchDispatchToProps', () => {
        it('should call dispatch when a function prop is called', () => {
          const mockDispatch = jest.fn()
          const mapped = mapDispatchToProps(mockDispatch);
          mapped.handleSubmit();
          expect(mockDispatch).toHaveBeenCalled();
          mapped.handleLogin();
          mapped.setFavorites();
          mapped.getMovies();
          expect(mockDispatch).toHaveBeenCalledTimes(4);
        })
    })

});