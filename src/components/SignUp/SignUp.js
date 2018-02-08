import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addUser } from '../../actions/index';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: ''
    };
  }

  // should parts of this be moved to helper?
  async addUser (event) {
    event.preventDefault();
    const { username, email, password } = this.state;

    try {
      const setUser = await fetch('/api/users/new', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const reply = await setUser
      console.log(reply)

    } catch (error) {
      const error = new Error('addUser failed to add user');
      return error;
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
              this.state.username,
              this.state.email.toLowerCase(),
              this.state.password
            );
            this.addUser(event)
          }}
        >
          <input
            value={this.state.username}
            placeholder="username"
            autoComplete="email"
            onChange={event => this.setState({ username: event.target.value })}
            required
          />
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
          <button>Sign Up</button>
        </form>
      </section>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  handleSubmit: (username, email, password) =>
    dispatch(addUser(username, email, password))
});

export default connect(null, mapDispatchToProps)(SignUp);

SignUp.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};
