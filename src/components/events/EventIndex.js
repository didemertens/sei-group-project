import React from 'react'
import axios from 'axios'
import moment from 'moment'
import { Link } from 'react-router-dom'
import MapGL, { Marker, Popup, NavigationControl } from 'react-map-gl'
import { FaMapMarkerAlt } from 'react-icons/fa'
import 'mapbox-gl/dist/mapbox-gl.css'
// import SearchBar from '../common/SearchBar'

const mapboxToken = process.env.MAPBOX_ACCESS_TOKEN

class EventIndex extends React.Component {
  state = {
    events: [],
    noEventsMessage: '',
    viewport: {
      latitude: 51.4558,
      longitude: 0.0255,
      zoom: 12
    },
    showInfo: null
  }

  async componentDidMount() {
    // search data from the home component
    const searchData = this.props.history.location.state.searchData
    try {
      const res = await axios.get('/api/events')
      this.filterCategory(res, searchData)
      this.convertPostcode(searchData)
    } catch (err) {

      this.props.history.push('/error')
    }
  }

  convertPostcode = async (searchData) => {
    const firstEvent = this.state.events[0] ? this.state.events[0] : searchData
    const resMap = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${firstEvent.postcode}.json?access_token=${mapboxToken}`
    )
    this.setState({
      ...this.state,
      viewport: {
        ...this.state.viewport,
        latitude: resMap.data.features[0].center[1],
        longitude: resMap.data.features[0].center[0],
        zoom: 12
      }
    })
  }

  // FILTER EVENTS BASED ON SEARCH
  // 1) CHECK CATEGORY
  filterCategory = (res, searchData) => {
    // filter out old events
    const newEvents = res.data.filter(event => (new Date() - new Date(event.date) <= 0))

    // if searched for all categories, don't filter
    let eventsByCategory = []
    if (searchData.category === 'All') {
      eventsByCategory = newEvents
    } else {
      eventsByCategory = newEvents.filter(event => {
        return event.category === searchData.category
      })
    }

    // no events with that category, try search again
    if (eventsByCategory.length === 0) {
      this.setState({
        noEventsMessage: `There are no ${searchData.category} events yet. Go back and try another search.`
      })
      return
    }
    this.filterPostcode(searchData, eventsByCategory)
  }

  // 2) CHECK POSTCODE
  filterPostcode = (searchData, eventsByCategory) => {
    const eventsByPostcode = eventsByCategory.filter(event => {
      return event.postcode.slice(0, 3) === searchData.postcode.slice(0, 3)
    })

    // no events in searched area, show events of searched category sorted by date & time
    if (eventsByPostcode.length === 0) {
      this.setState({
        noEventsMessage: `There are no ${searchData.category} events in your area yet. Here are some other suggestions.`
      })
      const sortedEvents = this.sortDateTime(eventsByCategory)
      this.setState({ events: sortedEvents })
      return
    }

    this.filterDate(searchData, eventsByPostcode)
  }

  // 3) CHECK DATE
  filterDate = (searchData, eventsByPostcode) => {
    const eventsByDates = eventsByPostcode.filter(event => {
      return moment(event.date).isSame(searchData.date, 'day') // checks year, month and day
    })

    // no events with searched date, show the events of that area based on postcode, sorted by date & time
    if (eventsByDates.length === 0) {
      const date = moment(searchData.date).format('DD/MM/YYYY')
      this.setState({
        noEventsMessage: `There are no events for ${date} yet. Here are some other suggestions.`
      })

      const sortedEvents = this.sortDateTime(eventsByPostcode)
      this.setState({ events: sortedEvents })
      return
    }

    this.filterTime(searchData, eventsByDates)
  }

  // 4) CHECK TIME
  filterTime = (searchData, eventsByDates) => {
    const date = moment(searchData.date).format('DD/MM/YYYY')
    let events = []

    const eventsByTime = eventsByDates.filter(event => {
      return event.time === searchData.time
    })

    // no events with searched time, show the events of that area on searched date sorted by time
    if (eventsByTime.length === 0) {
      this.setState({
        noEventsMessage: `There are no events at ${searchData.time} yet. Here are some other suggestions for ${date}.`
      })
      const sortedEvents = this.sortDateTime(eventsByDates)
      events = [...sortedEvents]
    } else {
      const sortedEventsTime = this.sortDateTime(eventsByTime)
      events = [...sortedEventsTime]
    }

    this.setState({ events })
  }

  // function sorting array on date & time
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

  handleSearch = (e) => {
    this.setState({ searchTerm: e.target.value })
  }

  // MAP
  mapRef = React.createRef()

  handleViewportChange = (viewport) => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    })
  }

  render() {
    const { events, noEventsMessage, viewport } = this.state
    return (
      <section className="section" >
        <div className="container">
          <h3>Events</h3>
          <div className="row">
            <div className="six columns">
              <div className="cards">
                {noEventsMessage && <p>{noEventsMessage}</p>}
                {events.map(event => (
                  <Link
                    key={event._id}
                    to={{
                      pathname: `/events/${event._id}`,
                      state: {
                        fromNotifications: true
                      }
                    }}>
                    <div className="card">
                      <h5>{event.name}</h5>
                      <p>{event.category}</p>
                      <p>{event.location}</p>
                      <p>{moment(event.date).format('DD/MM/YYYY')}</p>
                      <p>{event.time}</p>
                      <p>{event.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="six columns">
              <MapGL
                mapboxApiAccessToken={mapboxToken}
                ref={this.mapRef}
                {...viewport}
                height={'70vh'}
                width={'90vh'}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                onViewportChange={this.handleViewportChange}>
                {events.map((event, index) => {
                  return <Marker
                    key={index.toString()}
                    latitude={parseFloat(event.latitude)}
                    longitude={parseFloat(event.longitude)}
                  >
                    <FaMapMarkerAlt
                      className="marker"
                      src={event}
                      onMouseOver={() => this.setState({ showInfo: event })}
                      onMouseOut={() => this.setState({ showInfo: null })}
                    />
                  </Marker>
                })}
                {this.state.showInfo &&
                  <Popup tipSize={5}
                    anchor="bottom-right"
                    closeButton={false}
                    longitude={Number(this.state.showInfo.longitude)}
                    latitude={Number(this.state.showInfo.latitude)}>
                    <p>{this.state.showInfo.category}</p>
                  </Popup>
                }
                <div style={{ position: 'absolute', right: 0 }}>
                  <NavigationControl />
                </div>
              </MapGL>
            </div>
          </div>
        </div>
      </section >
    )
  }
}

export default EventIndex