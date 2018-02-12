import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addUser, login } from '../../actions/index';
import { fetchUser, postNewUser } from '../../helpers/helper';

export class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      password: '',
      email: '',
      error: ''
    };
  }

  async addUserDatabase(event) {
    event.preventDefault();
    const { name, password, email } = this.state;
    const { handleLogin, handleSubmit } = this.props;
    try {
      const existingUser = await fetchUser(email);
      if (!existingUser) {
        const newUser = await postNewUser({ name, password, email });
        handleLogin(true);
        handleSubmit(name, email.toLowerCase(), password, newUser.id);
      }
    } catch (error) {
      this.setState({
        error
      });
    }
  }

  render() {
    return (
      <section>
        {this.state.error && (
          <div className="failed-login">Failed to create new user</div>
        )}
        <form
          onSubmit={event => {
            event.preventDefault();
            this.addUserDatabase(event);
          }}
        >
          <input
            value={this.state.name}
            placeholder="name"
            autoComplete="text"
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

export const mapDispatchToProps = dispatch => ({
  handleSubmit: (name, email, password, userId) =>
    dispatch(addUser(name, email, password, userId)),
  handleLogin: boolean => dispatch(login(boolean))
});

export default connect(null, mapDispatchToProps)(SignUp);

SignUp.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired
};
