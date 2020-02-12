import React from 'react'
import axios from 'axios'
import FrontAuth from '../common/FrontAuth'
import EventForm from './EventForm'

class EventCreate extends React.Component {
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

  componentDidMount() {
    // to round the time up to the next 15 minutes of the hour (e.g. 10:15, 10:30)
    const coeff = 1000 * 60 * 15
    const roundedTime = new Date(Math.ceil(new Date() / coeff) * coeff)
    const formData = { ...this.state.formData, time: roundedTime }
    this.setState({ formData })
  }

  handleChange = ({ target: { name, value } }) => {
    const formData = { ...this.state.formData, [name]: value }
    this.setState({ formData })
  }

  handleTime = (time) => {
    const formData = { ...this.state.formData, time }
    this.setState({ formData })
  }

  handleDate = (date) => {
    const formData = { ...this.state.formData, date }
    this.setState({ formData })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    //make all data the same as in the database
    const createData = {
      ...this.state.formData,
      postcode: this.state.formData.postcode.replace(' ', ''),
      date: this.state.formData.date.toISOString(),
      time: this.state.formData.time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) // e.g. "10:00 AM"
    }

    try {
      const res = await this.createEvent(createData)
      await this.addCreatorToAttendees(res.data._id)
      this.props.history.push(`/events/${res.data._id}`)
    } catch (err) {
      console.log(err)
    }
  }

  createEvent(data) {
    return axios.post('/api/events', data, 
      { headers: { Authorization: `Bearer ${FrontAuth.getToken()}` } }
    )
  } 

  addCreatorToAttendees = (id) => {
    return axios.get(`/api/events/${id}/attend`, {
      headers: { Authorization: `Bearer ${FrontAuth.getToken()}` }
    })      
  }

  render() {
    const { formData } = this.state
    return (
      <EventForm
        formData={formData}
        handleChange={this.handleChange}
        handleTime={this.handleTime}
        handleDate={this.handleDate}
        handleSubmit={this.handleSubmit}
      />
    )
  }


}

export default EventCreate