import React from 'react'
import axios from 'axios'
import FrontAuth from '../common/FrontAuth'
import ImageUpload from '../auth/ImageUpload'

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

  handleChange = async e => {
    console.log(e.target.name, e.target.value)
    const userData = { ...this.state.userData, [e.target.name]: e.target.value }
    this.setState({ userData })
    try {
      await axios.post('/api/register', this.state.formData)
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    console.log(FrontAuth.getPayload().sub)
    console.log(this.props.match.params.id)
    console.log(this.state)
    if (!this.state.userData) return null
    const { userData } = this.state
    return (
      <div className="container">
        <div className="row">
          <div className="six columns">
            <h1>Profile Page</h1>
            {!userData.profileImage ? 
              <img src="https://res.cloudinary.com/dqwdkxz64/image/upload/v1581507521/dreamstime_xs_166504186_pnbywl.jpg" className="tennis-ball" alt="Profile Picture"/> 
              : 
              <img src={this.state.userData.profileImage} alt="Profile Picture"/> }
            {FrontAuth.getPayload().sub === this.props.match.params.id ? 
              <ImageUpload 
                labelText="My custom label text"
                handleChange={this.handleChange}
                fieldName="profileImage"
                labelClassName="my-label-class"
                inputClassName="my-input-class"
              />
              :
              '' }
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