import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { fetchUser } from '../../helpers/helper';
import { getUser, login } from '../../actions/index';
// import { login } from '../../actions/index';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  async validateLogin() {
    const userFetchResponse = await fetchUser();
    const userMatch = userFetchResponse.data.find( user => {
      return user.email === this.state.email
    })
    if(userMatch) {
      this.props.handleLogin(true)
      console.log('Welcome Back!')
    } else {
      console.log('Please Sign Up!')
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <section>
        <form
          onSubmit={event => {
            event.preventDefault();
            handleSubmit(
              this.state.email.toLowerCase(),
              this.state.password
            );
            this.validateLogin()
          }}
        >
          <input
            value={this.state.email}
            placeholder="email"
            type="email"
            autoComplete="email"
            onChange={event => this.setState({ email: event.target.value })}
            required
          />
          <input
            value={this.state.password}
            placeholder="password"
            type="password"
            autoComplete="on"
            onChange={event => this.setState({ password: event.target.value })}
            required
          />
          <button>Log In</button>
        </form>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleSubmit: (email, password) => (
    dispatch(getUser(email, password))
  ),
  handleLogin: (boolean) => (
    dispatch(login(boolean))
  )
})

export default connect(null, mapDispatchToProps)(Login);
