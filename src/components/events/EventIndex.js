import React from 'react'
import axios from 'axios'

class EventIndex extends React.Component {
  state = {
    events: []
  }
  async componentDidMount() {
    try {
      const res = await axios.get('/api/events')
      this.setState({ events: res.data.events })
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
    return (

      <div className="container">
        <div className="row">
          <div className="one column">
            <p>Home</p>
          </div>
          <div className="eleven columns">
            <p>testing</p>
          </div>
        </div>
      </div>

    )


  }

}
export default EventIndex