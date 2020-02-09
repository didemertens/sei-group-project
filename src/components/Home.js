import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

import 'react-datepicker/dist/react-datepicker.css'

class Home extends React.Component {


  state = {
    date: new Date,
    time: ''
  }

  handleChangeDate = date => {
    this.setState({ date })
  }

  handleChangeTime = time => {
    this.setState({ time })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(this.state.date.toISOString()) // same as in DB as isostring
    console.log(this.state.time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })) // same as in DB as string e.g. 10:27 AM
    console.log(this.state.time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) === '10:27 AM') // compare times
  }

  render() {
    console.log(moment(this.state.date).isSame('2020-02-09T23:00:00.000Z', 'day')) // will check year and month and day
    return (
      <>
        <section className="section hero">
          <div className="container">
            <h2 className="section-heading u-full-width">Out and About</h2>
          </div>
        </section>

        <section className="section form">
          <div className="container">
            <div className="row">
              <div className="one-half column">
                <form onSubmit={this.handleSubmit} className="form">
                  <label>Postcode</label>
                  <input type="text" className="input u-full-width" placeholder="Postcode" />
                  <label>Activity</label>
                  <select className="u-full-width">
                    <option value="" defaultValue hidden>Choose activity</option>
                    <option value="Football">Football</option>
                    <option value="Field hockey">Field hockey</option>
                    <option value="Yoga">Yoga</option>
                  </select>
                  <label>Date and Time</label>
                  <div>
                    <DatePicker
                      selected={this.state.date}
                      onChange={this.handleChangeDate}
                      dateFormat="d MMMM yyyy"
                    />
                    <DatePicker
                      selected={this.state.time}
                      onChange={this.handleChangeTime}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption="Time"
                      dateFormat="h:mm aa"
                    />
                  </div>
                  <button className="button">Search</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  }
}

export default Home