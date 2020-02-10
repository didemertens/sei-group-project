import React from 'react'
import axios from 'axios'

class Register extends React.Component {
  state = {
    data: {
      handle: '',
      firstName: '',
      surname: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    },
    errors: {}
  }

  handleChange = e => {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState({ data, errors })
  }

  handleSubmit = async e => {
    e.preventDefault()
    
    try {
      await axios.post('/api/register', this.state.data)
      this.props.history.push('/login')
    } catch (err) {
      this.setState({ errors: err.response.data.errors })
    }
  }

  render() {
    return (
        <>
        <h1>Registration Page</h1>

        <form onSubmit={this.handleSubmit}>

          <div className="row">
            <div className="five columns">

              <input type="text" 
                name="handle" 
                placeholder="Handle Name" 
                className={`u-full-width input ${this.state.errors.username} ? : 'has-error' : '' `} 
                onChange={this.handleChange}
              />
              {this.state.errors.handle && <small className="help has-error">{this.state.errors.handle.message}</small>}
            </div>
          </div>

          <div className="row">
            <div className="five columns">
              <input type="text" 
                name="firstName" 
                placeholder="First Name" 
                className="u-full-width" 
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="five columns">
              <input type="text"
                name="surname" 
                placeholder="Surname" 
                className="u-full-width" 
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="five columns">
              <input type="text" 
                name="email" 
                placeholder="Email Address" 
                className="u-full-width" 
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="five columns">
              <input type="text" 
                name="password" 
                placeholder="Password" 
                className="u-full-width" 
                onChange={this.handleChange}
              />
            </div>
          </div>


          <div className="row">
            <div className="five columns">
              <input type="text" 
                name="passwordConfirmation" 
                placeholder="Please confirm your password here" 
                className="u-full-width" 
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

export default Register