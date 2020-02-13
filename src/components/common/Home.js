import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import FrontAuth from '../common/FrontAuth'

class Home extends React.Component {
  state = {
    data: {
      postcode: '',
      category: '',
      date: new Date,
      time: new Date
    }
  }

  activityCategories = ['All', 'Football', 'Field Hockey', 'Badminton', 'Walking', 'Bootcamp', 'Running', 'Yoga', 'Rugby', 'Swimming']

  componentDidMount() {
    // if user token is expired, logout user
    if (!FrontAuth.isAuthenticated()) {
      FrontAuth.logout()
    }
    // to round the time up to the next 15 minutes of the hour (e.g. 10:15, 10:30)
    const coeff = 1000 * 60 * 15
    const roundedTime = new Date(Math.ceil(new Date() / coeff) * coeff)
    const data = { ...this.state.data, time: roundedTime }
    this.setState({ data })
  }

  handleChange = e => {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    this.setState({ data })
  }

  // different functions for time and date, because they return the date not the event (e)
  handleTime = (time) => {
    const data = { ...this.state.data, time }
    this.setState({ data })
  }

  handleDate = (date) => {
    const data = { ...this.state.data, date }
    this.setState({ data })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    // make all data the same as in the database
    const searchData = {
      ...this.state.data,
      postcode: this.state.data.postcode.replace(' ', ''),
      date: this.state.data.date.toISOString(),
      time: this.state.data.time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) // e.g. "10:00 AM"
    }
    // send above searchData to the index page, and send user there as well
    this.props.history.push({
      pathname: '/events',
      search: '',
      state: { searchData }
    })
  }

  render() {
    const { date, time } = this.state.data
    return (
      <>
        <section className="section hero-image">
          <div className="container form">
            <div className="row row-form">
              <h2 className="offset-by-two ten columns section-heading">out and about</h2>
              <div className="offset-by-two eight columns red-back">
                <form onSubmit={this.handleSubmit} className="form">
                  <label>Postcode</label>
                  <input
                    type="text"
                    className="input u-full-width"
                    placeholder="Postcode"
                    onChange={this.handleChange}
                    name="postcode"
                    required={true}
                  />
                  <label>Activity</label>
                  <select
                    className="u-full-width"
                    onChange={this.handleChange}
                    name="category"
                    required={true}
                  >
                    <option value="" defaultValue>Choose activity</option>
                    {this.activityCategories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  <label>Date and Time</label>
                  <div className="row">
                    <DatePicker
                      selected={date}
                      onChange={this.handleDate}
                      dateFormat="d MMMM yyyy"
                      name="date"
                    />
                    <DatePicker
                      selected={time}
                      onChange={this.handleTime}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption="Time"
                      dateFormat="h:mm aa"
                    />
                  </div>
                  <button className="button offset-by-three six columns btn-home">Search</button>
                </form>
              </div>
            </div>
          </div>
          <div className="color-overlay"></div>
        </section>
      </>
    )
  }
}

export default Home