import React from 'react'
import { Link } from 'react-router-dom'


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
                <li><Link className="navbar-item" to="/register">Register</Link></li>
                <li><Link className="navbar-item" to="/login">Login</Link></li>
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

export default Navbar



