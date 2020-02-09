import React from 'react'
// import axios from 'axios'

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
      // const res =  await axios.post('/api/login', this.state.data)
      // Auth.setToken(res.data.token)
    } catch (err) {
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
            <input type="text" placeholder="Email Address" className="u-full-width" onChange={this.handleChange}>
            </input>
          </div>
        </div>
        <div className="row">
          <div className="five columns">
            <input type="text" placeholder="Password" className="u-full-width" onChange={this.handleChange}>
            </input>
          </div>
        </div>
        <div className="row">
          <div className="five columns">
            <input type="submit" name className="button-primary u-fullwidth" value="Login">
            </input>
          </div>
        </div>
      </form>
      </>
    )
  }
}

export default Login 