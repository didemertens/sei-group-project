import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import FrontAuth from '../common/FrontAuth'

import { FaUserAlt } from 'react-icons/fa'

class Navbar extends React.Component {
  state = { navOpen: false }

  toggleNavbar = () => {
    this.setState({ navOpen: !this.state.navOpen })
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({ navOpen: false })
    }
  }

  handleLogout = () => {
    FrontAuth.logout()
    this.props.history.push('/')
  }

  render() {
    return (
      <>
        <div className="nav" id="mainNavBar">
          <input type="checkbox" id="nav-check" />
          <div className="nav-head">
            <div className="nav-title">
              <Link to="/" className="navbar-title">Home</Link>
            </div>
          </div>
          <div className="nav-btn">
            <label htmlFor="nav-check">
              <span></span>
              <span></span>
              <span></span>
            </label>
          </div>
          <div className="nav-links">
            {!FrontAuth.isAuthenticated()
              ?
              <>
                <Link to="/register" className="navbar-item">Register</Link>
                <Link to="/login" className="navbar-item">Login</Link>
              </>
              :
              null}

            {FrontAuth.isAuthenticated()
              ?
              <>
                <Link to="/create" className="navbar-item">Create an Event</Link>
                <Link className="navbar-item" to={`/profile/${FrontAuth.getPayload().sub}`}><FaUserAlt /></Link>
                <a className="navbar-item" href="#" onClick={this.handleLogout}>Logout</a>
              </>
              :
              null}
          </div>
        </div>
      </>
    )
  }
}

export default withRouter(Navbar)


