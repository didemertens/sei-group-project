import React from 'react'
import axios from 'axios'
import FrontAuth from '../common/FrontAuth'

class Login extends React.Component {
  state = {
    data: {
      email: '',
      password: ''
    },
    error: ''
  }

  handleChange = ({ target: { name, value } }) => {
    const data = { ...this.state.data, [name]: value }
    this.setState({ data, error: '' })
  }

  handleSubmit = async e => {
    e.preventDefault()

    try {
      const res = await axios.post('/api/login', this.state.data)
      FrontAuth.setToken(res.data.token)
      console.log(res.data)
      this.props.history.push(`/profile/${res.data.user._id}`)
    } catch (err) {
      console.log('this is the login page')
      this.setState({ error: 'Incorrect Credentials' })
    }
  }

  render() {
    return (
      <>
      <h1>Login</h1>
      <form onSubmit={this.handleSubmit}>

        <div className="row">
          <div className="five columns">
            <input type="text" 
              name="email" 
              placeholder="Email Address" 
              className={`u-full-width input ${this.state.error} ? : help 'has-error' : '' `}
              onChange={this.handleChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="five columns">
            <input type="password" 
              name="password" 
              placeholder="Password" 
              className={`u-full-width input ${this.state.error} ? : help 'has-error' : '' `}
              onChange={this.handleChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="five columns">
            <input type="submit" 
              className="button-primary u-fullwidth" 
              value="Login"
            />
          </div>
        </div>

      </form>
      </>
    )
  }
}

export default Login 