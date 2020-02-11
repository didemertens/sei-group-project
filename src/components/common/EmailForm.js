import React from 'react'
import axios from 'axios'

class EmailForm extends React.Component {
  state = {
    data: {
      email: '',
      category: ''
    },
    sendEmail: false
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const emailData = {
      from: this.state.data.email,
      text: this.state.data.category
    }
    try {
      axios.post('/api/email', emailData)
      this.setState({ sendEmail: true })
    } catch (err) {
      console.log(err)
    }
  }

  handleChange = (e) => {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    this.setState({ data })
  }

  render() {
    const { sendEmail } = this.state
    return (
      <section className="section">
        <h1>Email Form</h1>
        {!sendEmail && <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label>Your email</label>
            <input
              name="email"
              placeholder="Your email"
              type="email"
              onChange={this.handleChange}
            />
          </div>
          <div className="field">
            <label>New category</label>
            <input
              name="category"
              placeholder="Name of category"
              type="text"
              onChange={this.handleChange}
            />
          </div>
          <button className="button">Submit</button>
        </form>}
        {sendEmail && <p>Thanks! We'll respond within 7 working days.</p>}
      </section>
    )
  }
}

export default EmailForm