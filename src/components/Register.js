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
    } catch (err) {
      this.setState({ errors: err.response.data.errors })
    }
  }

  render() {
    return (
      <>
      <section>
        <h1>Registration</h1>
      </section>
      </>
    )
  }
}

export default Register