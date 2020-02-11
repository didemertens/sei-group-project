import React from 'react'
import Select from 'react-select'

class EventForm extends React.Component {
  state = {
    formData: {
      name: '',
      date: '',
      description: '',
      time: '',
      location: '',
      postcode: '',
      requiredPeople: '',
      category: ['']

    }
  }
  // {
  //   "name": "Yin Yoga",
  //   "category": "Yoga",
  //   "date": "February 14, 2020",
  //   "time": "06:00 PM",
  //   "location": "Millfields Park",
  //   "postcode": "e50la",
  //   "description": "Some relaxing yoga in the park."
  // }
  options = [
    { value: 'football', label: 'Football' },
    { value: 'yoga', label: 'Yoga' },
    { value: 'bootcamp', label: 'Bootcamp' },
    { value: 'dogwalking', label: 'Dog Walking' },
    { value: 'running', label: 'Running' },
    { value: 'walking', label: 'Walking' },
    { value: 'fieldhockey', label: 'Field Hockey' }
  ]
  handleChange = ({ target: { name, value, checked, type } }) => {
    const newValue = type === 'checkbox' ? checked : value
    const formData = { ...this.state.formData, [name]: newValue }
    this.setState({ formData })
  }
  handdleMultiChange = (selected) => {
    const category = selected ? selected.map(item => item.value) : []
    const formData = { ...this.state.formData, category }
    this.setState({ formData })
  }

  render() {
    const { formData } = this.state
    console.log(formData)
    return (
      <main className="section">
        <div className="columns is-mobile">
          <div className="column is-6-tablet is-offset-3-tablet is-8-mobile is-offset-2-mobile card">
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  className="input"
                  name="Name"
                  value={formData.name}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">date</label>
              <div className="control">
                <input
                  className="input"
                  name="date"
                  value={formData.date}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Description</label>
              <div className="control">
                <textarea
                  className="textarea"
                  name="description"
                  value={formData.description}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="field">
              <label className="Time">
                Time
                <input
                  name="time"
                  type="time"
                  onChange={this.handleChange}
                  checked={formData.time}
                />
              </label>
            </div>
            <div className="field">
              <label className="label">location</label>
              <div className="control">
                <input
                  className="input"
                  name="location"
                  value={formData.location}
                  onChange={this.handleChange}
                />
              </div>
              <div className="field">
                <label className="label">Post code</label>
                <div className="control">
                  <input
                    className="input"
                    name="Name"
                    value={formData.postcode}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="field">
              <label className="label">Required people</label>
              <div className="control">
                <input
                  className="input"
                  name="age"
                  type="number"
                  onChange={this.handleChange}
                  value={formData.requiredPeople}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Category</label>
              <div className="control">
                <Select
                  options={this.options}
                  isMulti
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="field">
            </div>
          </div>
        </div>
      </main>
    )
  }
}



export default EventForm