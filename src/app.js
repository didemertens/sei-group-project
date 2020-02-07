import React from 'react'
import ReactDOM from 'react-dom'
import './styles/main.scss'

class App extends React.Component {
  render() {
    console.log('hello')
    return (
      <h1>React Starter Pack</h1>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)