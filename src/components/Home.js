import React from 'react'

class Home extends React.Component {

  render() {
    return (
      <section className="hero">
        <div className="container">
          <div className="row">
            <div className="offset-by-four eight columns">
              <h2>Out and About</h2>
            </div>
          </div>
          <div className="row">
            <div className="offset-by-four eight columns">
              <button className="button-primary">Button element</button>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Home