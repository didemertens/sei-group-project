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
    console.log(this.state.error)
    return (
      <>
      <section className="section login-form">
        <div className="container login-container">
          <div className="container login-center">
            <h4 className="u-full-width login-heading">Login</h4>
            <form onSubmit={this.handleSubmit}>

              <div className="row">
                <div className="offset-by-three six columns">
                  <input type="text" 
                    name="email" 
                    placeholder="Email Address" 
                    className={`u-full-width login-input input ${this.state.error} ? : help 'has-error' : '' `}
                    onChange={this.handleChange}
                  />
                  {/* {this.state.error && <small className="help has-error">{this.state.error}</small>} */}
                </div>
              </div>

              <div className="row">
                <div className="offset-by-three six columns">
                  <input type="password" 
                    name="password" 
                    placeholder="Password" 
                    className={`u-full-width login-input input ${this.state.error} ? : help 'has-error' : '' `}
                    onChange={this.handleChange}
                  />
                  {this.state.error && <small className="help has-error">{this.state.error}</small>}
                </div>
              </div>

              <div className="row">
                <div className="offset-by-three six columns">
                  <button type="submit" 
                    className="button offset-by-three six columns btn-login" 
                    value="Login"
                  >Login
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>
      </section>
      </>
    )
  }
}

export default Login 