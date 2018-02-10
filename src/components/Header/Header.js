import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import { connect } from 'react-redux';
import { login } from '../../actions/index';
import PropTypes from 'prop-types';

export const Header = props => {
  const { loggedIn, logout } = props;
  const signInButtons = loggedIn ? (
    <button className="logout login-container" onClick={() => logout(false)}>
      Log Out
    </button>
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
  loggedIn: state.loggedIn
});

const mapDispatchToProps = dispatch => ({
  logout: boolean => dispatch(login(boolean))
});

Header.propTypes = {
  loggedIn: PropTypes.bool,
  logout: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
