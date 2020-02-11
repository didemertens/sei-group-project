import React from 'react'
import ReactDOM from 'react-dom'
import 'react-skeleton-css/styles/skeleton.2.0.4.css'
import './styles/main.scss'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from './components/common/Home'
import Navbar from './components/common/Navbar'
import EventIndex from './components/events/EventIndex'
import EventShow from './components/events/EventShow'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import ErrorPage from './components/common/Error'
import UserProfile from './components/auth/UserProfile'
import EventForm from './components/events/EventForm'

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/profile/:id" component={UserProfile} />
            <Route path="/events/:id" component={EventShow} />
            <Route path="/events" component={EventIndex} />
            <Route path="/register" component={Register} />
            <Route path="/create" component={EventForm} />
            <Route path="/login" component={Login} />
            <Route path="/*" component={ErrorPage} /> 
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