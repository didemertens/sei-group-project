import React from 'react'
import axios from 'axios'
// import { Link } from 'react-router-dom'
// import Auth from '../../lib/auth'

class EventShow extends React.Component {
  state = {
    eventInfo: null
  }

  componentDidMount() {
    const eventId = this.props.match.params.id
    this.getEvent(eventId)
  }

  getEvent = async (id) => {
    try {
      const response = await axios.get(`/api/events/${id}`)
      console.log(response)
      this.setState({ eventInfo: response.data })
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  // handleDelete = async () => {
  //   const eventId = this.props.match.params.id
  //   try {
  //     await axios.delete(`/api/events/${id}`, {
  //       headers: { Authorization: `Bearer ${Auth.getToken()}` }
  //     })
  //     this.props.history.push('/events')
  //   } catch (err) {
  //     this.props.history.push('/notfound')
  //   }
  // }

  // isOwner = () => Auth.getPayload().sub === this.state.eventInfo.user._id

  render() {
    if (!this.state.eventInfo) return null
    // const { eventInfo } = this.state
    console.log(this.state.eventInfo.user)
    return (
      <div className="container">
        <div className="row">
          <div className="four columns">
            <p>Event Info</p>
            <p>Name</p><p>{this.state.eventInfo.name}</p>
            <p>Date</p><p>{this.state.eventInfo.date}</p>
            <p>Time</p><p>{this.state.eventInfo.time}</p>
            <p>Location</p><p>{this.state.eventInfo.location}</p>
            <p>Description</p><p>{this.state.eventInfo.description}</p>
          </div>
          <div className="four columns">
            <p>Attendees Info</p>
            <p>{this.state.eventInfo.user.handle}</p>
            <p>{this.state.eventInfo.user.firstName} {this.state.eventInfo.user.surname}</p>
          </div>
          <div className="four columns">
            <p>User Comments</p>
          </div>
        </div>
      </div>
    )
  }
}

export default EventShow