import React from 'react';
import ReactDOM from 'react-dom';
import { fetchApi, postBackend, deleteFromBackend } from './apiCalls';

describe('API Call Tests', () => {
  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation( (url) => {
      return Promise.resolve({
        status: 200,
        json: () => Promise.resolve({})
      })
    })
  })

  describe('fetchApi', () => {
    it('fetchs if status is at or below 200', () => {
      expect(window.fetch).not.toHaveBeenCalled();
      fetchApi('someurl');
      expect(window.fetch).toHaveBeenCalled();
    })

    it('throws an error if response is above 200', () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
          status: 500,   
        })
      )
      expect(fetchApi('someurl')).rejects.toEqual(Error('fetchApi failed to fetch data: Error: Bad status code!'));
    })
  })

  describe('postBackend', () => {
    it('fetchs if status is at or below 200', () => {
      expect(window.fetch).not.toHaveBeenCalled();
      postBackend('someurl', {});
      expect(window.fetch).toHaveBeenCalled();
    })

    it('throws an error if response is above 200', () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
          status: 500,   
        })
      )
      expect(postBackend('someurl')).rejects.toEqual(Error('postBackend failed to post to backend: Error: Bad status code!'));
    })
  })

  describe('deleteFromBackend', () => {
    it('fetchs if status is at or below 200', () => {
      expect(window.fetch).not.toHaveBeenCalled();
      deleteFromBackend('someurl', {});
      expect(window.fetch).toHaveBeenCalled();
    })

    it('throws an error if response is above 200', () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
          status: 500,   
        })
      )
      expect(deleteFromBackend('someurl')).rejects.toEqual(Error('deleteFromBackend failed to post to backend: Error: Bad status code!'));
    })
  })
})

