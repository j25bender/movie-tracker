/* eslint-disable */
import React from 'react';
import { shallow } from 'enzyme';
import { Header, mapStateToProps, mapDispatchToProps } from './Header';

describe('Header', () => {
  let mockFunc;
  it('matches the snapshot', () => {
    mockFunc = jest.fn();
    const wrapper = shallow(
      <Header loggedIn={false} logout={mockFunc} name="" />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('loggedIn boolean should determine buttons rendered', () => {
    mockFunc = jest.fn();
    const wrapper = shallow(
      <Header loggedIn={true} logout={mockFunc} name="Woz" />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should map store correctly', () => {
    const mockStore = {
      loggedIn: true,
      userData: { name: 'Wendy' }
    };
    const mapped = mapStateToProps(mockStore);
    expect(mapped.loggedIn).toEqual(mockStore.loggedIn);
    expect(mapped.name).toEqual(mockStore.userData.name);
  });

  it('should call dispatch when Log Out button clicked', () => {
    const mockDispatch = jest.fn();
    const mapped = mapDispatchToProps(mockDispatch);
    mapped.logout(true);
    expect(mockDispatch).toHaveBeenCalled();
  });
});
