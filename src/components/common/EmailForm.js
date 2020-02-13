import React from 'react'
import axios from 'axios'
import { FaCheck } from 'react-icons/fa'

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
    <>
      <section className="section eform-form">
        <div className="container eform-container">
          <div className="container eform-center">

            <h4 className="u-full-width eform-heading">Email Form</h4>
            <p className="u-full-width eform-subtitle">Creating an event but can&apos;t see a category to match it to? Complete the form below to let us know! </p>
            {!sendEmail && <form onSubmit={this.handleSubmit}>

              <div className="row">
                <div className="eform-field">
                  {/* <label>Your email</label> */}
                  <input
                    className="eform-input offset-by-three six columns"
                    name="email"
                    placeholder="Enter your email address"
                    type="email"
                    onChange={this.handleChange}
                  />
                </div>
              </div>

              <div className="row">
                <div className="eform-field">
                  {/* <label>New category</label> */}
                  <input
                    className="eform-input offset-by-three six columns"
                    name="category"
                    placeholder="Enter the name of the new category"
                    type="text"
                    onChange={this.handleChange}
                  />
                </div>
              </div>

              <button className="btn-eform offset-by-three six columns">Submit</button>
            </form>}
            {sendEmail && <p className="u-full-width eform-submitted">
              <FaCheck className="tick-eform"/>Thanks - you&apos;ve successfully submitted your form! We&apos;ll let you know if we can add your suggested category to the website within 7 working days.</p>}
          </div>
        </div>
      </section>
    </>
    )
  }
}

export default EmailForm