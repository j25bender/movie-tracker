import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
  //for now there's a navlink back to home
  //really we'll want to redirect there when 
  //a person signs in successfully
  return (
    <nav>
      <div className='login-container'>
        <NavLink to={{ pathname: '/sign-up' }}>
          <button className='sign-up'>Sign Up</button>
        </NavLink>
        <NavLink to={{ pathname: '/login' }}>
          <button className='login'>Login</button>
        </NavLink>
      </div>
      <NavLink to={{ pathname: '/' }}>
        <h1 className="title">Movie Tracker</h1>
      </NavLink>
    </nav>
  );
};

export default Header;
