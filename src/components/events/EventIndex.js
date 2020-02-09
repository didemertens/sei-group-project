import React from 'react'
import axios from 'axios'
import moment from 'moment'


class EventIndex extends React.Component {
  state = {
    events: [],
    otherSuggestion: ''
  }

  async componentDidMount() {
    // searchData from the home component
    const searchData = this.props.history.location.state.searchData
    try {
      const res = await axios.get('/api/events')
      this.filterEvents(res, searchData)
    } catch (err) {
      console.log(err)
      this.props.history.push('/error')
    }
  }

  // filter on: 1) category, 2) location, 3) date, 4) time
  filterEvents = (res, searchData) => {
    console.log(searchData)
    let events = []
    const date = moment(searchData.date).format('DD/MM/YYYY')

    // checking category
    const categories = res.data.filter(event => {
      return event.category === searchData.category
    })

    if (categories.length === 0) {
      this.setState({
        otherSuggestion: `There are no ${searchData.category} events yet. Go back and try another search.`
      })
      return
    }

    // checking postcode
    const postcodes = res.data.filter(event => {
      return event.postcode === searchData.postcode
    })

    if (postcodes.length === 0) {
      this.setState({
        otherSuggestion: 'There are no events in your area yet. Go back and try another search.'
      })
      return
    }

    // checking date
    const dates = categories.filter(event => {
      return moment(event.date).isSame(searchData.date, 'day') // checks year, month and day
    })

    if (dates.length === 0) {
      this.setState({
        otherSuggestion: `There are no events for ${date} yet. Here are some other suggestions.`
      })
      events = [...postcodes]
      this.setState({ events })
      return
    }

    // checking time
    const times = dates.filter(event => {
      return event.time === searchData.time
    })

    if (times.length === 0) {
      this.setState({
        otherSuggestion: `There are no events at ${searchData.time} yet. Here are some other suggestions for ${date}.`
      })
      events = [...dates]
    } else {
      events = [...times]
    }

    this.setState({ events })
  }


  // handleChange = e => {
  //   e.preventDefault()
  //   console.log(e.target.value)
  //   const eventSelected = e.target.value
  //   const filterEvents = this.state.events.filter(event => (event.name === eventSelected || eventSelected === 'All'))
  //   this.setState({ filterEvents })
  // }

  render() {
    const { events, otherSuggestion } = this.state
    return (
      <section className="section">
        <div className="container">
          <h3>Events Page</h3>
          <div className="row">
            <div className="six columns">
              <p>Events</p>
              <div className="cards">
                {otherSuggestion && <p>{otherSuggestion}</p>}
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