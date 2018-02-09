import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';



const Header = ({ loggedIn }) => {
  const signInButtons = loggedIn
    ? <button className='logout'>LogOut</button>
    : ( <div className='login-container'>
        <NavLink to={{ pathname: '/sign-up' }}>
          <button className='sign-up'>Sign Up</button>
        </NavLink>
        <NavLink to={{ pathname: '/login' }}>
          <button className='login'>Login</button>
        </NavLink>
      </div>)
  return (
    <nav>
      {signInButtons}
      <NavLink to={{ pathname: '/' }}>
        <h1 className="title">Movie Tracker</h1>
      </NavLink>
    </nav>
  );
};

export default Header;
