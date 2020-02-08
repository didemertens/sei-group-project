import React from 'react'
import ReactDOM from 'react-dom'
import 'react-skeleton-css/styles/skeleton.2.0.4.css'
import './styles/main.scss'

import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'

import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <main>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </nav>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
          </Switch>
        </main>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)