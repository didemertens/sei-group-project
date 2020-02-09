import React from 'react'

class Login extends React.Component {
  state = {
    data: {
      email: '',
      password: ''
    },
    error: ''
  }

  render() {
    return (
      <>
      <h1>Login</h1>
      <form>
        <div className="row">
          <div className="six">
            <input type="text" placeholder="Email Address" className="u-full-width">
            </input>
          </div>
        </div>
        <div className="row">
          <div className="six">
            <input type="text" placeholder="Password" className="u-full-width">
            </input>
          </div>
        </div>
        <div className="row">
          <div className="six">
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