import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { FaPlusCircle } from 'react-icons/fa'
import axios from 'axios'
import FrontAuth from '../common/FrontAuth'

class EventForm extends React.Component {
  state = {
    formData: {
      name: '',
      date: new Date,
      description: '',
      time: new Date,
      location: '',
      postcode: '',
      requiredPeople: '',
      category: ''
    }
  }

  activityCategories = ['Football', 'Field Hockey', 'Badminton', 'Walking', 'Bootcamp', 'Running', 'Yoga', 'Rugby', 'Swimming']

  handleChange = ({ target: { name, value } }) => {
    const formData = { ...this.state.formData, [name]: value }
    this.setState({ formData })
  }
  handleTime = (time) => {
    const data = { ...this.state.data, time }
    this.setState({ data })
  }
  handleDate = (date) => {
    const data = { ...this.state.data, date }
    this.setState({ data })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    console.log('hello')
    //make all data the same as in the database
    const createData = {
      ...this.state.formData,
      postcode: this.state.formData.postcode.replace(' ', ''),
      date: this.state.formData.date.toISOString(),
      time: this.state.formData.time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) // e.g. "10:00 AM"
    }

    try {
      const res = await axios.post('/api/events', createData, { headers: { Authorization: `Bearer ${FrontAuth.getToken()}` } })
      this.props.history.push(`/events/${res.data._id}`)
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const { formData } = this.state
    return (
      <main className="section">
        <div className="columns is-mobile">
          <div className="column is-6-tablet is-offset-3-tablet is-8-mobile is-offset-2-mobile">
            <form onSubmit={this.handleSubmit}>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                    className="input"
                    name="name"
                    value={formData.name}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">date</label>
                <DatePicker
                  selected={formData.date}
                  onChange={this.handleDate}
                  dateFormat="d MMMM yyyy"
                  name="date"
                />
              </div>
              <div className="field">
                <label className="label">Description</label>
                <div className="control">
                  <textarea
                    className="textarea"
                    name="description"
                    value={formData.description}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="field">
                <label className="Time">
                  Time </label>
                <DatePicker
                  selected={formData.time}
                  onChange={this.handleTime}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                />
              </div>
              <div className="field">
                <label className="label">location</label>
                <div className="control">
                  <input
                    className="input"
                    name="location"
                    value={formData.location}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="field">
                  <label className="label">Post code</label>
                  <div className="control">
                    <input
                      className="input"
                      name="postcode"
                      value={formData.postcode}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="label">Required people</label>
                <div className="control">
                  <input
                    className="input"
                    name="requiredPeople"
                    type="number"
                    onChange={this.handleChange}
                    value={formData.requiredPeople}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Category</label>
                <div className="control">
                  <label>Activity
                      <a href="/email" data-tooltip="Can't see the category that you're looking for? Click here to send a request.">
                        <FaPlusCircle />
                        </a>
                  </label>
                  <select
                    className="u-full-width"
                    onChange={this.handleChange}
                    name="category"
                    required={true}
                  >
                    <option value="" defaultValue>Choose activity</option>
                    {this.activityCategories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="field">
                <button type="submit" className=""> Confirm </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    )
  }
}

export default EventForm