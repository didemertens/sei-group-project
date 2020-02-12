import React from 'react'
import axios from 'axios'
import moment from 'moment'
import { Link } from 'react-router-dom'
import FrontAuth from '../common/FrontAuth'
import { FaMapMarkerAlt } from 'react-icons/fa'

import MapGL, { Marker, NavigationControl } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
const mapboxToken = process.env.MAPBOX_ACCESS_TOKEN



class EventShow extends React.Component {
  state = {
    eventInfo: null,
    viewport: {
      latitude: 0,
      longitude: 0,
      zoom: 0
    },
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
      console.log(response)
      this.setState({ eventInfo: response.data })
      this.setState({
        ...this.state,
        viewport: {
          ...this.state.viewport,
          latitude: Number(response.data.latitude),
          longitude: Number(response.data.longitude),
          zoom: 14
        }
      })
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  handleChange = ({ target: { value } }) => {
    const comment = value
    this.setState({ comment })
  }

  handleSubmitAttend = async (e) => {
    e.preventDefault()
    const eventId = this.props.match.params.id
    try {
      await axios.get(`/api/events/${eventId}/attend`, {
        headers: { Authorization: `Bearer ${FrontAuth.getToken()}` }
      })
      this.getEvent(eventId)
    } catch (err) {
      this.setState({ errors: err })
    }
  }

  handleSubmitNotAttend = async (e) => {
    e.preventDefault()
    const eventId = this.props.match.params.id
    const attendId = this.state.eventInfo.attendees.filter(attendee => attendee.user._id === FrontAuth.getPayload().sub)[0]._id
    try {
      await axios.delete(`/api/events/${eventId}/attend/${attendId}`, {
        headers: { Authorization: `Bearer ${FrontAuth.getToken()}` }
      })
      this.getEvent(eventId)
    } catch (err) {
      this.setState({ errors: err })
    }
  }

  handleSubmitComment = async (e) => {
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

  mapRef = React.createRef()

  handleViewportChange = (viewport) => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    })
  }

  render() {
    if (!this.state.eventInfo) return null
    console.log('state', this.props.location.state )
    return (
      <div className="container">
        <div className="row">
          {this.props.location.state
            ?
            <button onClick={() => this.props.history.goBack()}>Back to Search</button>
            :
            null
          }
        </div>
        <div className="row">
          <h2>{this.state.eventInfo.name}</h2>
          <div className="four columns">
            <p>Hosted by {this.state.eventInfo.user.firstName} {this.state.eventInfo.user.surname}</p>
          </div>
          <div className="two columns">
            <form onSubmit={this.handleSubmitAttend}>
              {!(this.state.eventInfo.attendees ? this.state.eventInfo.attendees.filter(attendee => attendee.user._id === FrontAuth.getPayload().sub)[0] : 'none') && this.state.eventInfo.requiredPeople - this.state.eventInfo.attendees.length !== 0 && <button type="submit">Going</button>}
            </form>
            {this.state.eventInfo.attendees.filter(attendee => attendee.user._id === FrontAuth.getPayload().sub)[0]
              ?
              <p>You are going to this event!</p>
              :
              <div></div>
            }
            {!!(this.state.eventInfo.attendees ? this.state.eventInfo.attendees.filter(attendee => attendee.user._id === FrontAuth.getPayload().sub)[0] : 'none') &&
            <form onSubmit={this.handleSubmitNotAttend}>
              <button type="submit">Not Going</button>
            </form>
            }
            {this.state.eventInfo.requiredPeople - this.state.eventInfo.attendees.length === 0
              ?
              <p>This event is full!</p>
              :
              this.state.eventInfo.requiredPeople - this.state.eventInfo.attendees.length === 1
                ?
                <p>{this.state.eventInfo.requiredPeople - this.state.eventInfo.attendees.length} space left</p>
                :
                <p>{this.state.eventInfo.requiredPeople - this.state.eventInfo.attendees.length} spaces left</p>
            }
          </div>
          <div className="two columns">
            {this.isOwner() && 
              <>
                <Link to={`/events/${this.state.eventInfo._id}/edit`}>
                  <button>Update Event</button>
                </Link>
                <button onClick={this.handleDelete}>Delete Event</button>
              </>
            }
          </div>
        </div>
        <div className="row">
          <div className="four columns">
            <h2>Event Info</h2>
            <p>Category</p><p>{this.state.eventInfo.category}</p>
            <p>Date</p><p>{moment(this.state.eventInfo.date).format('DD/MM/YYYY')}</p>
            <p>Time</p><p>{this.state.eventInfo.time}</p>
            <p>Location</p><p>{this.state.eventInfo.location}</p>
            <p>Description</p><p>{this.state.eventInfo.description}</p>
            <MapGL
              mapboxApiAccessToken={mapboxToken}
              ref={this.mapRef}
              height={'300px'}
              width={'300px'}
              mapStyle="mapbox://styles/mapbox/streets-v11"
              onViewportChange={this.handleViewportChange}
              {...this.state.viewport}
            >
              <Marker
                latitude={this.state.eventInfo.latitude * 1}
                longitude={this.state.eventInfo.longitude * 1}
              >
                <FaMapMarkerAlt
                  className="marker"
                />
              </Marker>
              <div style={{ position: 'absolute', right: 0 }}>
                <NavigationControl />
              </div>
            </MapGL>
          </div>
          <div className="four columns">
            <h2>Attendees</h2>
            <p>{this.state.eventInfo.user.handle} (Event Host)</p>
            <p>{this.state.eventInfo.user.firstName} {this.state.eventInfo.user.surname}</p>
            <hr />
            {this.state.eventInfo.attendees
              ?
              <>
                {this.state.eventInfo.attendees.map(attendee => (
                  attendee.user._id === this.state.eventInfo.user._id
                    ?
                    null
                    :
                    <p key={attendee.user._id}>{attendee.user.handle}</p>
                ))}
              </>
              :
              <div></div>
            }
          </div>
          <div className="four columns">
            <h2>User Comments</h2>
            <form onSubmit={this.handleSubmitComment}>
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