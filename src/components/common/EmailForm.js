import React from 'react'


class EmailForm extends React.Component {
  state = {
    data: {
      email: '',
      category: ''
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()


    //   const msg = {
    //     to,
    //     from,
    //     text,
    //     subject
    //   }
    //   sgMail.send(msg)
    // }

  }

  handleChange = (e) => {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    this.setState({ data })
  }

  render() {
    return (
      <section className="section">
        <h1>Email Form</h1>
        <form onSubmit={this.handleSubmit}>
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
        </form>
      </section>
    )
  }
}

export default EmailForm