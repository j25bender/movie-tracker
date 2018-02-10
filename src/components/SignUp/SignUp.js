import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addUser, login } from '../../actions/index';
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
    console.log('props', this.props)
    console.log('state', this.state)
    
    event.preventDefault();
    const { name, password, email} = this.state;
    const { handleLogin, handleSubmit } = this.props;

    try {
      const getUserData = await fetchUser();

      const match = getUserData.data.find(user => {
        return user.email === email;
      });
      if (!match) {
        const newUser = await fetch('/api/users/new', {
          method: 'POST',
          body: JSON.stringify({ name, password, email }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const userResponse = await newUser.json();
        handleLogin(true);
        handleSubmit( name, email.toLowerCase(), password, userResponse.id );

      } else {
        return alert('Email is already registered!');
      }
    } catch (error) {
      const error = new Error('addUser failed to add user');
      return error;
    }
  }

  render() {
    return (
      <section>
        <form
          onSubmit={event => {
            event.preventDefault();
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
  handleSubmit: (name, email, password, id) =>
    dispatch(addUser(name, email, password, id)),
  handleLogin: boolean => dispatch(login(boolean))
});

export default connect(null, mapDispatchToProps)(SignUp);

SignUp.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};
