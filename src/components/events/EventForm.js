import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { FaPlusCircle } from 'react-icons/fa'

const EventForm = ({ formData, handleChange, handleTime, handleDate, handleSubmit }) => {
  const activityCategories = ['Football', 'Field Hockey', 'Badminton', 'Walking', 'Bootcamp', 'Running', 'Yoga', 'Rugby', 'Swimming']

  return (
    <main className="section">

      <div className="columns is-mobile">

        <div className="column is-6-tablet is-offset-3-tablet is-8-mobile is-offset-2-mobile event-form-container">
          <div className="row event-base">
            <div className="four columns"><p></p></div>
            <div className="four columns event-create-form">
              <form onSubmit={handleSubmit}>

                <div className="field">
                  <div className="control">
                    <label className="label">Name</label>
                    <input
                      className="input"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <label className="label">Category
                      <a href="/email" data-tooltip="Can't see the category that you're looking for? Click here to send a request.">
                        <FaPlusCircle />
                      </a>
                    </label>
                    <select
                      className="u-full-width event-form-category"
                      onChange={handleChange}
                      name="category"
                      required={true}
                    >
                      {formData.category ?
                        <option value={formData.category}>{formData.category}</option>
                        :
                        <option value="" defaultValue>Choose activity</option>
                      }
                      {activityCategories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="field">
                  <label className="label">Description</label>
                  <div className="control">
                    <textarea
                      className="textarea"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Location Name</label>
                  <div className="control">
                    <input
                      className="input"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Location Postcode</label>
                  <div className="control">
                    <input
                      className="input"
                      name="postcode"
                      value={formData.postcode}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Date</label>
                  <DatePicker
                    selected={formData.date}
                    onChange={handleDate}
                    dateFormat="d MMMM yyyy"
                    name="date"
                  />
                </div>
                <div className="field">
                  <label className="label">
                    Time </label>
                  <DatePicker
                    selected={formData.time}
                    onChange={handleTime}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                  />
                </div>
                <div className="field">
                  <label className="label">Required people</label>
                  <div className="control">
                    <input
                      className="input"
                      name="requiredPeople"
                      type="number"
                      onChange={handleChange}
                      value={formData.requiredPeople}
                    />
                  </div>
                </div>
                <div className="field">
                  <button type="submit" className="btn-confirm"> Confirm </button>
                </div>
              </form>
            </div>
            <div className="four columns"><p></p></div>
          </div>

        </div>
      </div>
    </main>
  )
}

export default EventForm