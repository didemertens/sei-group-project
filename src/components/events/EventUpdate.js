import React from 'react'
import axios from 'axios'
import FrontAuth from '../common/FrontAuth'
import EventForm from './EventForm'
import moment from 'moment'

class EventUpdate extends React.Component {
  state = {
    formData: {
      name: '',
      date: '',
      description: '',
      time: '',
      location: '',
      postcode: '',
      requiredPeople: '',
      category: ''
    }
  }

  async componentDidMount() {
    try {
      const res = await axios.get(`/api/events/${this.props.match.params.id}`)
      const formatTime = moment(res.data.time, ['h:mm A']).format('HH:mm:00')
      const timeAndDate = `${moment(res.data.date).format('YYYY-MM-DD')}T${(formatTime)}`
      const timeConvert = moment(timeAndDate).format()
      const newTime = new Date(timeConvert)
      const newDate = new Date(res.data.date)

      const eventData = {
        ...res.data,
        date: newDate,
        time: newTime
      }
      this.setState({ formData: eventData })

    } catch (err) {
      console.log(err)
    }
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
      await axios.put(`/api/events/${this.props.match.params.id}`, createData, { headers: { Authorization: `Bearer ${FrontAuth.getToken()}` } })
      this.props.history.push(`/events/${this.props.match.params.id}`)
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const { formData } = this.state
    console.log(formData)
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

export default EventUpdate