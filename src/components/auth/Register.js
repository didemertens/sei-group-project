import React from 'react'
import axios from 'axios'
import ImageUpload from './ImageUpload'

class Register extends React.Component {
  state = {
    formData: {
      handle: '',
      firstName: '',
      surname: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      profileImage: ''
    },
    errors: {}
  }

  handleChange = e => {
    console.log(e.target.name, e.target.value)
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState({ formData, errors })
  }

  handleSubmit = async e => {
    e.preventDefault()
    
    try {
      await axios.post('/api/register', this.state.formData)
      this.props.history.push('/login')
    } catch (err) {
      this.setState({ errors: err.response.data.errors })
    }
  }

  render() {
    return (
        <>
        <h1>Registration Page</h1>

        <form onSubmit={this.handleSubmit}>

          <div className="row">
            <div className="five columns">

              <input type="text" 
                name="handle" 
                placeholder="Handle Name" 
                className={`u-full-width input ${this.state.errors.handle} ? : 'has-error' : '' `} 
                onChange={this.handleChange}
              />
              {this.state.errors.handle && <small className="help has-error">{this.state.errors.handle}</small>}
            </div>
          </div>

          <div className="row">
            <div className="five columns">
              <input type="text" 
                name="firstName" 
                placeholder="First Name" 
                className={`u-full-width input ${this.state.errors.firstName} ? : 'has-error' : '' `} 
                onChange={this.handleChange}
              />
              {this.state.errors.firstName && <small className="help has-error">{this.state.errors.firstName}</small>}
            </div>
          </div>

          <div className="row">
            <div className="five columns">
              <input type="text"
                name="surname" 
                placeholder="Surname" 
                className={`u-full-width input ${this.state.errors.surname} ? : 'has-error' : '' `} 
                onChange={this.handleChange}
              />
              {this.state.errors.surname && <small className="help has-error">{this.state.errors.surname}</small>}
            </div>
          </div>

          <div className="row">
            <div className="five columns">
              <input type="text" 
                name="email" 
                placeholder="Email Address" 
                className={`u-full-width input ${this.state.errors.email} ? : 'has-error' : '' `} 
                onChange={this.handleChange}
              />
              {this.state.errors.email && <small className="help has-error">{this.state.errors.email}</small>}
            </div>
          </div>

          <div className="row">
            <div className="five columns">
              <input type="password" 
                name="password" 
                placeholder="Password" 
                className={`u-full-width input ${this.state.errors.password} ? : 'has-error' : '' `} 
                onChange={this.handleChange}
              />
              {this.state.errors.password && <small className="help has-error">{this.state.errors.password.message}</small>}
            </div>
          </div>


          <div className="row">
            <div className="five columns">
              <input type="password" 
                name="passwordConfirmation" 
                placeholder="Please confirm your password here" 
                className={`u-full-width input ${this.state.errors.passwordConfirmation} ? : 'has-error' : '' `} 
                onChange={this.handleChange}
              />
              {this.state.errors.passwordConfirmation && <small className="help has-error">{this.state.errors.passwordConfirmation.message}</small>}
            </div>
          </div>

          <div className="row">
            <div className="five columns">
              <label className="label">Upload your photo</label>
              <div className="control">
                <img src={this.state.formData.profileImage} />
                <ImageUpload 
                  name="imageURL"
                  labelText="My custom label text"
                  handleChange={this.handleChange}
                  fieldName="profileImage"
                  labelClassName="my-label-class"
                  inputClassName="my-input-class"
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="five columns">
              <input type="submit" 
                className="button-primary u-fullwidth" 
                value="Register"
              />
            </div>
          </div>

        </form>
      </>
    )
  }
}

export default Register