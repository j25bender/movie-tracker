import React, { Component } from 'react';
import  { addUser } from '../../actions/index'
import { connect } from 'react-redux'


class SignUp extends Component {
  constructor(props) {
    super(props)

    this.state = { 
      username: '',
      password: ''
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <section>
        <form onSubmit={ (e) => {
              e.preventDefault()
              handleSubmit(this.state.username,                                 this.state.password)
        }}>
          <input value={ this.state.username }
                 placeholder='username' 
                 onChange={ (e) => this.setState({ username: e.target.value })} />
          <input value={ this.state.password }
                 placeholder='Password'
                 type='password'
                 onChange={ (e) => this.setState({ password: e.target.value })} />
          <button>Sign Up</button>
        </form>
      </section>
    )
  }

}

const mapDispatchToProps = (dispatch) => ({
  handleSubmit: (username, password) => dispatch(addUser(username, password))
})

export default connect(null, mapDispatchToProps)(SignUp)