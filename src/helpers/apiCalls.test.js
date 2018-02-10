import React from 'react';
import ReactDOM from 'react-dom';
import { fetchApi, fetchBackend } from './apiCalls';
let error;

describe('API Call Tests', () => {
  const expectedUrl = 'https://movie-tracker.com/api/';
  const mockInitialFetchJson = [{
    "vote_count": 311,
    "id": 440597,
    "video": false,
    "vote_average": 5.4,
    "title": "Wish Upon",
    "popularity": 46.419678,
    "poster_path": "/u0vnocj57vJt5DHoBEqUOD1G4SU.jpg",
    "original_language": "en",
    "original_title": "Wish Upon",
    "genre_ids": [ 53, 27, 14 ],
    "backdrop_path": "/l0dvARJQ6xZeVPhxSS5EYibYGBR.jpg",
    "adult": false,
    "overview": "A teenage girl discovers a box with magical powers, but those powers comes with a deadly price.",
    "release_date": "2017-07-07"
  }]

  it('everything is not ok', async () => {
    let recievedError;
    let errObj = new Error();
    let expectedError = [`${errObj}: fetchApi failed to fetch data: ${errObj}: Bad status code!`];
    window.fetch = jest.fn().mockImplementation( () => {
      return Promise.resolve({
        ok: false,
        status: 404
      })
    })
    try {
      await fetchApi()
    }
    catch(err) {
      recievedError = err
    }
    expect(recievedError).toEqual(expectedError)          
  })
})