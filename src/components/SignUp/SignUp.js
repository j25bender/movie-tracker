import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addUser } from '../../actions/index';
import { fetchUser } from '../../helpers/helper';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      password: '',
      email: ''
    };
  }

  async addUserDatabase(event) {
    event.preventDefault();
    const { name, password, email } = this.state;

    try {
      const getUserData = await fetchUser();

      const match = getUserData.data.find(user => {
        // Should we return true or false instead of the object or undefined?
        // It works for now, is there a better way?
        return user.email === email;
      });
      if (!match) {
        await fetch('/api/users/new', {
          method: 'POST',
          body: JSON.stringify({ name, password, email }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      } else {
        return alert('Email allready registered!');
      }
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
              this.state.name,
              this.state.email.toLowerCase(),
              this.state.password
            );
            this.addUserDatabase(event);
          }}
        >
          <input
            value={this.state.name}
            placeholder="name"
            autoComplete="email"
            onChange={event => this.setState({ name: event.target.value })}
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
  handleSubmit: (name, email, password) =>
    dispatch(addUser(name, email, password))
});

export default connect(null, mapDispatchToProps)(SignUp);

SignUp.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};
