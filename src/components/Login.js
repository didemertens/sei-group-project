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
      <h1>This is the Login page</h1>
    )
  }
}

export default Login 