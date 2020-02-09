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
      const { data } = await axios.get(`/api/events/${id}`)
      this.setState({ eventInfo: data })
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
    // if (!this.state.eventInfo) return null
    // const { eventInfo } = this.state
    return (
      <div className="container">
        <div className="row">
          <div className="four columns">
            <p>Event Info</p>
            <p>Name</p>
            <p>Date</p>
            <p>Time</p>
            <p>Location</p>
            <p>Description</p>
          </div>
          <div className="four columns">
            <p>Attendees Info</p>
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