import React from 'react'
import axios from 'axios'
import moment from 'moment'


class EventIndex extends React.Component {
  state = {
    events: []
  }

  async componentDidMount() {
    // searchData from the home component
    const searchData = this.props.history.location.state.searchData
    try {
      const res = await axios.get('/api/events')
      // for now, just filter on category
      const events = res.data.filter(event => {
        return event.category === searchData.category
      })
      this.setState({ events })

      // filter on date
      // const events = res.data.filter(event => {
      //   return moment(event.date).isSame(searchData.date, 'day') // will check year and month and day
      // })
    } catch (err) {
      console.log(err)
      this.props.history.push('/error')
    }
  }

  // handleChange = e => {
  //   e.preventDefault()
  //   console.log(e.target.value)
  //   const eventSelected = e.target.value
  //   const filterEvents = this.state.events.filter(event => (event.name === eventSelected || eventSelected === 'All'))
  //   this.setState({ filterEvents })
  // }

  render() {
    const { events } = this.state
    return (
      <section className="section">
        <div className="container">
          <h3>Events Page</h3>
          <div className="row">
            <div className="six columns">
              <p>Events</p>
              <div className="cards">
                {events.map(event => (
                  <div className="card" key={event._id}>
                    <h5>{event.name}</h5>
                    <p>{event.category}</p>
                    <p>{event.location}</p>
                    <p>{moment(event.date).format('DD/MM/YYYY')}</p>
                    <p>{event.time}</p>
                    <p>{event.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="six columns">
              <p>Map</p>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default EventIndex