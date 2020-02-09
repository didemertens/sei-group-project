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
      this.filterCategory(res, searchData)
    } catch (err) {
      console.log(err)
      this.props.history.push('/error')
    }
  }

  // CHECK CATEGORY
  filterCategory = (res, searchData) => {
    const eventsByCategory = res.data.filter(event => {
      return event.category === searchData.category
    })

    // no events with that category, try search again
    if (eventsByCategory.length === 0) {
      this.setState({
        otherSuggestion: `There are no ${searchData.category} events yet. Go back and try another search.`
      })
      return
    }
    this.filterPostcode(searchData, eventsByCategory)
  }

  // CHECK POSTCODE
  filterPostcode = (searchData, eventsByCategory) => {
    const eventsByPostcode = eventsByCategory.filter(event => {
      return event.postcode.slice(0, 3) === searchData.postcode.slice(0, 3)
    })

    // no events in searched area, show events of searched category sorted by date & time
    if (eventsByPostcode.length === 0) {
      this.setState({
        otherSuggestion: `There are no ${searchData.category} events in your area yet. Here are some other suggestions.`
      })
      const sortedEvents = this.sortDateTime(eventsByCategory)
      this.setState({ events: sortedEvents })
      return
    }

    this.filterDate(searchData, eventsByPostcode)
  }

  // CHECK FILTER
  filterDate = (searchData, eventsByPostcode) => {
    const eventsByDates = eventsByPostcode.filter(event => {
      return moment(event.date).isSame(searchData.date, 'day') // checks year, month and day
    })

    // no events with searched date, show the events of that area based on postcode, sorted by date & time
    if (eventsByDates.length === 0) {
      const date = moment(searchData.date).format('DD/MM/YYYY')

      this.setState({
        otherSuggestion: `There are no events for ${date} yet. Here are some other suggestions.`
      })

      const sortedEvents = this.sortDateTime(eventsByPostcode)
      this.setState({ events: sortedEvents })
      return
    }

    this.filterTime(searchData, eventsByDates)
  }

  // CHECK TIME
  filterTime = (searchData, eventsByDates) => {
    const date = moment(searchData.date).format('DD/MM/YYYY')
    let events = []

    const eventsByTime = eventsByDates.filter(event => {
      return event.time === searchData.time
    })

    // no events with searched time, show the events of that area on searched date sorted by time
    if (eventsByTime.length === 0) {
      this.setState({
        otherSuggestion: `There are no events at ${searchData.time} yet. Here are some other suggestions for ${date}.`
      })
      const sortedEvents = this.sortDateTime(eventsByDates)
      events = [...sortedEvents]
    } else {
      const sortedEventsTime = this.sortDateTime(eventsByTime)
      events = [...sortedEventsTime]
    }

    this.setState({ events })
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
      <section className="section" >
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
      </section >
    )
  }
}

export default EventIndex