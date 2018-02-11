import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import { connect } from 'react-redux';
import { login } from '../../actions/index';
import PropTypes from 'prop-types';

export const Header = props => {
  const { loggedIn, logout, name } = props;
  const signInButtons = loggedIn ? (
    <div className="login-container">
      <p>{name}</p>
      <button className="logout" onClick={() => logout(false)}>
        Log Out
      </button>
    </div>
  ) : (
    <div className="login-container">
      <NavLink to={{ pathname: '/sign-up' }}>
        <button className="sign-up">Sign Up</button>
      </NavLink>
      <NavLink to={{ pathname: '/login' }}>
        <button className="login">Login</button>
      </NavLink>
    </div>
  );

  return (
    <nav>
      {signInButtons}
      <NavLink to={{ pathname: '/' }}>
        <h1 className="title">Movie Tracker</h1>
      </NavLink>
    </nav>
  );
};

const mapStateToProps = state => ({
  loggedIn: state.loggedIn,
  name: state.userData.name
});

const mapDispatchToProps = dispatch => ({
  logout: boolean => dispatch(login(boolean))
});

Header.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  name: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
