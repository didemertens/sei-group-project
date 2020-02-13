import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import FrontAuth from '../common/FrontAuth'
import ImageUpload from '../auth/ImageUpload'
import moment from 'moment'

class UserProfile extends React.Component {
  state = {
    userData: {
      name: '',
      handle: '',
      email: '',
      profileImage: '',
      createdEvents: [],
      attendingEvents: []
    },
    upcomingEvents: [],
    pastEvents: [],
    error: ''
  }

  componentDidMount() {
    const userId = this.props.match.params.id
    this.getUserData(userId)
  }

  getUserData = async (id) => {
    try {
      FrontAuth.getToken()
      const response = await axios.get(`/api/profile/${id}`, {
        headers: { Authorization: `Bearer ${FrontAuth.getToken()}` }
      })
      this.setState({ userData: response.data })
      this.filterEvents(response.data.attendingEvents)
      this.sortCreatedEvents(response.data.createdEvents)
    } catch (err) {
      console.log(err)
    }
  }

  filterEvents = (events) => {
    const filterUpcomingEvents = []
    const filterPastEvents = []
    events.forEach(event => {
      if (new Date() - new Date(event.date) <= 0) {
        filterUpcomingEvents.push(event)
      } else {
        filterPastEvents.push(event)
      }
    })
    const upcomingEvents = this.sortDateTime(filterUpcomingEvents)
    const pastEvents = this.sortDateTime(filterPastEvents)
    this.setState({ upcomingEvents, pastEvents })
  }

  sortCreatedEvents = (events) => {
    // sort created events
    const createdEventsUnsort = events
    const sortedEvents = this.sortDateTime(createdEventsUnsort)
    const userData = { ...this.state.userData, createdEvents: sortedEvents }
    this.setState({ userData })
  }

  sortDateTime = (array) => {
    const sortedArray = [...array].sort((a, b) => {
      if (a.date === b.date) {
        const aTime = moment(a.time, ['h:mm A']).format('HH:mm').replace(':', '.')
        const bTime = moment(b.time, ['h:mm A']).format('HH:mm').replace(':', '.')
        return (aTime - bTime)
      } else {
        return new Date(a.date) - new Date(b.date)
      }
    })
    return sortedArray
  }

  handleChange = async e => {
    const userData = { ...this.state.userData, [e.target.name]: e.target.value }
    this.setState({ userData })
    try {
      await axios.post('/api/register', this.state.formData)
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    // console.log(this.state)
    if (!this.state.userData) return null
    const { userData } = this.state
    return (
      <section className="section profile-section">
        <div className="container profile-container">
          <div className="row profile-row">
            <div className="six columns">
              {!userData.profileImage ?
                <img src="https://res.cloudinary.com/dqwdkxz64/image/upload/v1581507521/dreamstime_xs_166504186_pnbywl.jpg" className="tennis-ball" alt="Profile Picture" />
                :
                <img src={this.state.userData.profileImage} alt="Profile Picture" />}
              {FrontAuth.getPayload().sub === this.props.match.params.id ?
                <ImageUpload
                  labelText=""
                  handleChange={this.handleChange}
                  fieldName="profileImage"
                  labelClassName="my-label-class"
                  inputClassName="my-input-class"
                />
                :
                ''}
            </div>
            <div className="six columns">
              <div className="profile-user-data">
                <p>Name: {userData.firstName} {userData.surname}</p>
                <p>Handle: @{userData.handle}</p>
                <p>Email: {userData.email}</p>
              </div>
            </div>
          </div>

          <div className="row profile-row">
            <div className="six columns">
              {this.state.upcomingEvents.length !== 0
                ?
                <div className="profile-event-cards profile-upcoming-cards">
                  <h2>Upcoming Events</h2>
                  {this.state.upcomingEvents.map(event => (
                    <div key={event._id} className="profile-card profile-upcoming-card">
                      <Link to={`/events/${event._id}`}>
                        <h5>{event.name}</h5>
                        <p>When: {event.time} {moment(event.date).format('DD/MM/YYYY')}</p>
                        <p>Where: {event.location}</p>
                      </Link>
                    </div>
                  ))}
                </div>
                :
                <div></div>
              }
            </div>
            <div className="six columns">
              {userData.createdEvents
                ?
                <>
                  <div className="profile-event-cards profile-created-cards">
                    <h2>Created Events</h2>
                    {userData.createdEvents.map(event => (
                      <div key={event._id} className="profile-card profile-created-card">
                        <Link to={`/events/${event._id}`}>
                          <h5>{event.name}</h5>
                          <p>When: {event.time} {moment(event.date).format('DD/MM/YYYY')}</p>
                          <p>Where: {event.location}</p>
                        </Link>
                      </div>
                    ))}
                  </div>
                </>
                :
                <div></div>
              }
              <h2></h2>
            </div>
          </div>

          <div className="row profile-row">
            <div className="one-half column"></div>
            {this.state.pastEvents.length !== 0
              ?
              <>
                <div className="profile-event-cards profile-past-cards">
                  <h2>Past Events</h2>
                  <div className="profile-container-past-cards">
                    {this.state.pastEvents.map(event => (
                      <div key={event._id} className="profile-card profile-past-card">
                        <Link to={`/events/${event._id}`}>
                          <h5>{event.name}</h5>
                          <p>When: {event.time} {moment(event.date).format('DD/MM/YYYY')}</p>
                          <p>Where: {event.location}</p>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </>
              :
              <div></div>
            }
          </div>
        </div>
      </section>
    )
  }
}

export default UserProfile 