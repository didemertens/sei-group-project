import React from 'react'
import axios from 'axios'
import FrontAuth from '../common/FrontAuth'

class UserProfile extends React.Component {
  state = {
    userData: {
      name: '',
      handle: '',
      email: '',
      imageURL: '',
      createdEvents: [],
      attendingEvents: []
    },
    error: ''
  }

  componentDidMount() {
    const userId = this.props.match.params.id
    console.log(this.props.match.params.id)
    this.getUserData(userId)
  }

  getUserData = async (id) => {
    try {
      FrontAuth.getToken()
      const response = await axios.get(`/api/profile/${id}`, {
        headers: { Authorization: `Bearer ${FrontAuth.getToken()}` }
      })
      this.setState({ userData: response.data })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    if (!this.state.userData) return null
    const { userData } = this.state
    return (
      <div className="container">
        <div className="row">
          <div className="six columns">
            <h1>[User Profile Picture]</h1>
            {userData.attendingEvents.length !== 0
              ?
              <>
                <h2>Attending Events</h2>
                {userData.attendingEvents.map(event => (
                  <div key={event._id}>
                    <p>{event.name}</p>
                    <p>{event.date}</p>
                    <p>{event.time}</p>
                    <p>{event.location}</p>
                  </div>
                ))}
              </>
              :
              <div></div>
            }
          </div>
          <div className="six columns">
            <p>Name {userData.firstName} {userData.surname}</p>
            <p>Handle {userData.handle}</p>
            <p>Email {userData.email}</p>
            {userData.createdEvents
              ?
              <>
                <h2>Created Events</h2>
                {userData.createdEvents.map(event => (
                  <div key={event._id}>
                    <p>{event.name}</p>
                    <p>{event.date}</p>
                    <p>{event.time}</p>
                    <p>{event.location}</p>
                  </div>
                ))}
              </>
              :
              <div></div>
            }
            <h2></h2>
          </div>
        </div>
      </div>
    )
  }
}

export default UserProfile 