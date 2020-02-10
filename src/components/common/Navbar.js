import React from 'react'

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
        <div className="two columns">
        </div>
        <div id="nav" className="fourteen columns">
          <ul>
            <li><a href="#">1</a></li>
            <li><a href="#">2</a></li>
            <li><a href="#">3</a></li>
            <li><a href="#">4</a></li>
          </ul>
          <div id="nav" className="fourteen columns">
          </div>
        </div>
      </div>
    </>
    )
  }

}

export default Navbar



