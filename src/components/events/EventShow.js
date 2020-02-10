import React from 'react'
import axios from 'axios'
import moment from 'moment'
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
    console.log(this.state.eventInfo)
    return (
      <div className="container">
        <div className="row">
          <div className="four columns">
            <h2>Event Info</h2>
            <p>Name</p><p>{this.state.eventInfo.name}</p>
            <p>Date</p><p>{moment(this.state.eventInfo.date).format('DD/MM/YYYY')}</p>
            <p>Time</p><p>{this.state.eventInfo.time}</p>
            <p>Location</p><p>{this.state.eventInfo.location}</p>
            <p>Description</p><p>{this.state.eventInfo.description}</p>
          </div>
          <div className="four columns">
            <h2>Attendees Info</h2>
            <h4>Event Creator</h4>
            <p>{this.state.eventInfo.user.handle}</p>
            <p>{this.state.eventInfo.user.firstName} {this.state.eventInfo.user.surname}</p>
            {this.state.eventInfo.attendees
              ?
              <>
                <h4>Other Attendees</h4>
                <p>{this.state.eventInfo.attendees.map(attendee => (
                  <p key={attendee.user._id}>{attendee.user.handle}</p>
                ))}</p>
              </>
              :
              <div></div>
            }
          </div>
          <div className="four columns">
            <h2>User Comments</h2>
            {this.state.eventInfo.comments
              ?
              this.state.eventInfo.comments.map(comment => (
                <div key={comment.user._id}>
                  <p>{comment.user.handle}</p>
                  <p>{comment.text}</p>
                </div>
              ))
              :
              <div></div>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default EventShow