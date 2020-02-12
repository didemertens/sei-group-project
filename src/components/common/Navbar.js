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

  // openDrawerMenu = () => {
  //   var x = document.getElementById('mainNavBar')
  //   if (x.className === 'navBar'){
  //     x.className += 'responsive'
  //   } else {
  //     x.className = 'navBar'
  //   }
  // }

  handleLogout = () => {
    FrontAuth.logout()
    this.props.history.push('/')
  }

  render() {
    return (
      <>
        <div className="navBar" id="mainNavBar">
          <div className="navBar-left">
            <Link to="/" className="navbar-item">Home</Link>
          </div>
          <div className="navBar-right">
            {!FrontAuth.isAuthenticated()
              ?
              <>
                <Link to="/register" className="navbar-item">Register</Link>
                <Link to="/login" className="navbar-item">Login</Link>
              </>
              :
              null
            }
            {FrontAuth.isAuthenticated()
              ?
              <>
                <Link to="/create" className="navbar-item">Create an Event</Link>
                <Link className="navbar-item" to={`/profile/${FrontAuth.getPayload().sub}`}><FaUserAlt /></Link>
                <a className="navbar-item" href="#" onClick={this.handleLogout}>Logout</a>
              </>
              :
              null
            }
          </div>
          
          {/* <a href="javascript:void(0);" className="icon" onClick="openDrawerMenu()">&#9776;</a> */}
        </div>


        {/* <div className="row navbar" id="nav">
          <ul>

            <div className="two columns nav-link">
              <li><Link to="/" className="navbar-item">Home</Link></li>
            </div>
            <div className="two columns nav-link">
              {FrontAuth.isAuthenticated() && <li><Link to="/create" className="navbar-item">Create an Event</Link></li>}
            </div>
            <div className="four columns">
              <p></p>
            </div>
            <div className="two columns nav-link">
              {!FrontAuth.isAuthenticated() && <li><Link to="/register" className="navbar-item">Register</Link></li>}
            </div>
            <div className="two columns nav-link">
              {!FrontAuth.isAuthenticated() && <li><Link to="/login" className="navbar-item">Login</Link></li>}
            </div>
            <div className="two columns nav-link">
              {FrontAuth.isAuthenticated() && <li><Link className="navbar-item" to={`/profile/${FrontAuth.getPayload().sub}`}><FaUserAlt /></Link></li>}
            </div>
            <div className="two columns nav-link">
              {FrontAuth.isAuthenticated() && <a className="navbar-item" href="#" onClick={this.handleLogout}>Logout</a>}
            </div>
          </ul>
        </div> */}
      </>
    )
  }
}

export default withRouter(Navbar)


