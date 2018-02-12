/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import * as helper from './helper';
import * as api from './apiCalls';
import { movieData, filteredMovieData, allUsers } from './mockData';

describe('helper', () => {
  describe('cleanMovies', () => {
    it('filters an array of objects', () => {
      const result = helper.cleanMovies(movieData);
      expect(result).toEqual(filteredMovieData);
    });
  });

  describe('fetchMovies', () => {

    it('throws an error if response is above 200', () => {
      window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          status: 500
        })
      );
      expect(helper.fetchMovies()).rejects.toEqual(
        Error('fetchMovies failed to fetch data')
      );
    });

    it('fetches movie data and returns a filtered array of objects', async () => {
      window.fetch = jest.fn().mockImplementation(() => ({
        status: 200,
        json: () =>
          new Promise((resolve, reject) => {
            resolve(filteredMovieData);
          })
      }));

      api.fetchApi = jest.fn().mockImplementation(() => {
        return movieData
      })

      const result = await helper.fetchMovies();
      expect(result).toEqual(filteredMovieData);
    });
  });

  describe('findRequestedUser', () => {
    it('finds a match in an array if both the username and password key value pairs are identical to what is passed in', () => {
      expect(helper.findRequestedUser(allUsers, 'steve@smail.com', 'letmein')).toEqual(
        undefined
      );
      expect(helper.findRequestedUser(allUsers, 'bob@aol.com', 'password')).toEqual(
        undefined
      );
      expect(
        helper.findRequestedUser(allUsers, 'tman2272@aol.com', 'letmein')
      ).toEqual(undefined);
      expect(
        helper.findRequestedUser(allUsers, 'tman2272@aol.com', 'password')
      ).toEqual({
        email: 'tman2272@aol.com',
        id: 1,
        name: 'Taylor',
        password: 'password'
      });
    });
  });

  describe('fetchUser', () => {
    it('throws an error if response is above 200', () => {
      window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          status: 500
        })
      );
      expect(helper.fetchUser()).rejects.toEqual(
        Error('fetchUser failed to fetch data')
      );
    });

    it('makes a fetch to get data and then finds the requested user', () => {
      api.fetchApi = jest.fn().mockImplementation(() => {
        return allUsers
      })

      helper.fetchUser('email', 'password');
      expect(api.fetchApi).toHaveBeenCalled()
    });
  });

  describe('postNewUser', () => {
    it('throws an error if response is above 200', () => {
      window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          status: 500
        })
      );
      expect(helper.postNewUser()).rejects.toEqual(
        Error(
          'postNewUser failed to post to backend: Error: postBackend failed to post to backend: Error: Bad status code!'
        )
      );
    });

    it('adds new data to the backEnd database', async () => {
      api.postBackend = jest.fn().mockImplementation(() => {
        return 'success'
      })

      await helper.postNewUser({})

      expect(api.postBackend).toHaveBeenCalled();
    });
  });
});
