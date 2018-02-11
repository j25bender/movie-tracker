/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import { allUsers } from '../../helpers/mockData';
import { SignUp, mapDispatchToProps } from './SignUp';
import { shallow } from 'enzyme';
import * as helper from '../../helpers/helper';

describe('SignUp', () => {
  let wrapper;
  let mockFn = jest.fn()
  let expectedResponse;
  window.fetch = jest.fn().mockImplementation(() => {
    return Promise.resolve({
      status: 200,
      json: () => Promise.resolve(expectedResponse)
    })
  })

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
    const mockEvent = {
      preventDefault: () => {}
    }
    helper.fetchUser = jest.fn().mockImplementation(() => {
      return window.fetch()
    })
    helper.postNewUser = jest.fn().mockImplementation(() => {
      return '4'
    })

    it('calls fetch', () => {
      expect(window.fetch).not.toHaveBeenCalled()
      expectedResponse = allUsers.data[0];
      wrapper.instance().addUserDatabase(mockEvent);
      expect(window.fetch).toHaveBeenCalled();
    })

    it('only calls postNewUser, handleLogin, and handleSubmit if the user is new', async () => {
      helper.fetchUser = jest.fn().mockImplementation(() => {
        return undefined
      })
      
      await wrapper.instance().addUserDatabase(mockEvent);
      expect(wrapper.instance().props.handleLogin).toHaveBeenCalled();
      expect(wrapper.instance().props.handleSubmit).toHaveBeenCalled();
    })
  })

  describe('mapDispatchToProps', () => {
    it('should call dispatch when a function prop is called', () => {
      const mockDispatch = jest.fn()
      const mapped = mapDispatchToProps(mockDispatch);
      mapped.handleSubmit();
      expect(mockDispatch).toHaveBeenCalled();
      mapped.handleLogin();
      expect(mockDispatch).toHaveBeenCalledTimes(2);
    })
  })
})
