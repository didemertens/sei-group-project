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
        <div className="container">
          <div className="navbar-brand">
            <div className="two columns">
            </div>
            <div id="nav" className="fourteen columns">
              <ul>
                <li><Link className="navbar-item" to="/">Out And About</Link></li>
                {!FrontAuth.isAuthenticated() && <li><Link className="navbar-item" to="/register">Register</Link></li>}
                {!FrontAuth.isAuthenticated() && <li><Link className="navbar-item" to="/login">Login</Link></li>}
                {FrontAuth.isAuthenticated() && <li><Link className="navbar-item" to="/create">Create an Event</Link></li>}
                {FrontAuth.isAuthenticated() && <a href="#" className="navbar-item" onClick={this.handleLogout}>Logout</a>}
                {FrontAuth.isAuthenticated() && <li><Link className="navbar-item" to="/profile/:id"><FaUserAlt /></Link></li>}
              </ul>
              <div id="nav" className="fourteen columns">
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default withRouter(Navbar)


