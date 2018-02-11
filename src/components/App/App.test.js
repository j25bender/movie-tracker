import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import { shallow } from 'enzyme';
import { App, mapStateToProps } from './App'
import Main from '../Main/Main';
import Header from '../Header/Header';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';

describe('App', () => {
  let mockMovieData;
  let mockFavorites;

  beforeEach( () => {
    mockMovieData = [{
                      title: 'Coco',
                      movie_id: 354912,
                      poster_path: 'https://image.tmdb.jpg',
                      overview: 'Despite...',
                      release_date: '05/05/25',
                      vote_average: 10.0
                    }];
    mockFavorites = [{
                      id: 15,
                      movie_id: 395834,
                      overview: 'An FBI agent...',
                      poster_path: 'https://image.tmdb.org/',
                      release_date: '2017-08-03',
                      title: 'Wind River',
                      user_id: 2,
                      vote_average: '7.5'
                    }]    
  })

  it('matches snapshot', () => {
    const wrapper = shallow(<App loggedIn={false} movieData={mockMovieData} favorites={mockFavorites} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should map the store correctly', () => {
    const mockStore = {
      loggedIn: false,
      movieData: mockMovieData,
      favorites: mockFavorites
    }
    const mapped = mapStateToProps(mockStore);
    expect(mapped.loggedIn).toEqual(mockStore.loggedIn)
  })
});
