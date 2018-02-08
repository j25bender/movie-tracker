import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchUser from '../../helpers/helper';
import { getUser } from '../../actions/index';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  async componentDidMount() {
    console.log(fetchUser.fetchUser())
  }

  render() {
    console.log('props',this.props)
    // const { handleSubmit } = this.props;
    return (
      <section>
        <form
          onSubmit={event => {
            event.preventDefault();
            this.props.handleSubmit(
              this.state.email.toLowerCase(),
              this.state.password
            );
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

const mapDispatchToProps = (dispatch) => {
  handleSubmit: (email, password) => (
    dispatch(getUser(email, password))
  )
}

export default connect(null, mapDispatchToProps)(Login);
