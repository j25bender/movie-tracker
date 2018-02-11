/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import { SignUp } from './SignUp';
import { shallow } from 'enzyme';

describe('SignUp', () => {
  let wrapper;
  let mockFn = jest.fn()

  beforeEach(() => {
    wrapper = shallow(<SignUp handleSubmit={mockFn}
                              handleLogin={mockFn}/>)
  })

  it('match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
  
  it('has default state', () => {
    const defaultState = {
      name: '',
      password: '',
      email: '',
      error: ''
    }
    expect(wrapper.state()).toEqual(defaultState);
  })

  describe('addUserDatabase', () => {
    it('calls existingUser', () => {

    })

    it('only calls postNewUser, handleLogin, and handleSubmit if the user exists', () => {

    })

    it('alerts if email already exists', () => {

    })
  })
})
