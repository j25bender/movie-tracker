/* eslint-disable */
import React, { Component } from 'react';
import Card from '../Card/Card';
import { getMoviesFromApi, setFavorites } from '../../actions/index.js';
import { Main, mapStateToProps, mapDispatchToProps } from './Main';
import apiCalls from '../../helpers/apiCalls';
import { shallow } from 'enzyme';

// jest.mock('../../helpers/apiCalls');

describe('Main', () => {
  const fakeStore = (state) => {
    return {
      dispatch: () => {}
    };
  }
  let mockFn;
  let wrapper;
  let mockData;

  beforeEach(() => {
    mockFn = jest.fn();
    window.fetch = jest.fn().mockImplementation( (url) => {
      return Promise.resolve({
        status: 200,
        json: () => Promise.resolve(mockData)
      })
    })
    wrapper = shallow(<Main fetchMovies={mockFn}
                            setFavorites={mockFn}
                            loggedIn={false} />);
  })

  it('matches the snapshot', () => {
    
    expect(wrapper).toMatchSnapshot();
  }); 

  it('calls fetchMovies when component mounts', () => {
    expect(wrapper.instance().props.fetchMovies).toHaveBeenCalled()
  })

  describe('mapStateToProps', () => {
    it('returns an object with keys of loggedIn and userId', () => {
      const mockState = {
        loggedIn: false,
        userData: {
          userId: '3'
        }
      }
      expect(mapStateToProps(mockState)).toEqual({loggedIn: false, userId: '3'})
    })
  })

  describe('mapDispatchToProps', () => {
    it('should call the dispatch function when using a function from mapDispachToProps', () => {
      const mockDispatch = jest.fn();
      const mapped = mapDispatchToProps(mockDispatch)

      mapped.addUser();
      mapped.fetchMovies();
      mapped.setFavorites();
      
      expect(mockDispatch).toHaveBeenCalledTimes(3)
    })
  })

  describe('toggleFavorite', () => {
      mockData = {
        data: [
          {
            id: '3',
            movie_id: '5'
          }
        ]
      }
    it('calls fetch', async () => {
      expect(window.fetch).not.toHaveBeenCalled();
      await wrapper.instance().toggleFavorite({id: '0'});
      expect(window.fetch).toHaveBeenCalled();
    })

    it('calls postFavorites if selected card is not a duplicate', async () => {
      expect(wrapper.instance().props.postFavorites).not.toHaveBeenCalled;
      await wrapper.instance().toggleFavorite({id: '0'});
      expect(wrapper.instance().props.postFavorites).toHaveBeenCalled;
    })

    it('doesn\'t call postFavorites if selected card is a duplicate', async () => {
      expect(wrapper.instance().props.postFavorites).not.toHaveBeenCalled;
      await wrapper.instance().toggleFavorite({id: '3'});
      expect(wrapper.instance().props.postFavorites).not.toHaveBeenCalled;
    })
  })
});

