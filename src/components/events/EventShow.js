import React from 'react'
import axios from 'axios'
import moment from 'moment'
import { Link } from 'react-router-dom'
import FrontAuth from '../common/FrontAuth'

class EventShow extends React.Component {
  state = {
    eventInfo: null,
    comment: '',
    errors: ''
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

  handleChange = ({ target: { value } }) => {
    const comment = value
    this.setState({ comment })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const eventId = this.props.match.params.id
    try {
      await axios.post(`/api/events/${eventId}/comments`, { text: this.state.comment }, {
        headers: { Authorization: `Bearer ${FrontAuth.getToken()}` }
      })
      this.setState({ ...this.state, comment: '' })
      this.getEvent(eventId)
    } catch (err) {
      this.setState({ errors: err })
    }
  }

  isOwner = () => FrontAuth.getPayload().sub === this.state.eventInfo.user._id
  
  handleDelete = async () => {
    const eventId = this.props.match.params.id
    try {
      await axios.delete(`/api/events/${eventId}`, {
        headers: { Authorization: `Bearer ${FrontAuth.getToken()}` }
      })
      this.props.history.push('/events')
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  render() {
    if (!this.state.eventInfo) return null
    console.log(this.state.eventInfo)
    return (
      <div className="container">
        <div className="row">
          <h2>{this.state.eventInfo.name}</h2>
          <div className="four columns">
            <p>Hosted by {this.state.eventInfo.user.firstName} {this.state.eventInfo.user.surname}</p>
          </div>
          <div className="two columns">
            {this.isOwner() && 
              <>
                <Link to={`/events/${this.state.eventInfo._id}/edit`}>
                  Update Event
                </Link>
                <button onClick={this.handleDelete}>Delete Event</button>
              </>
            }
          </div>
        </div>
        <div className="row">
          <div className="four columns">
            <h2>Event Info</h2>
            {/* <p>Name</p><p>{this.state.eventInfo.name}</p> */}
            <p>Category</p><p>{this.state.eventInfo.category}</p>
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
            <form onSubmit={this.handleSubmit}>
              <textarea name="comment" onChange={this.handleChange} value={this.state.comment}></textarea>
              <button type="submit">Send</button>
            </form>
            {this.state.eventInfo.comments
              ?
              this.state.eventInfo.comments.map(comment => (
                <div key={comment._id}>
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