import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import SingleCardSpread from '../SingleCardSpread/SingleCardSpread'
import CreateSingleCardSpread from '../CreateSingleCardSpread/CreateSingleCardSpread'
import SCSIndex from '../SCSIndex/SCSIndex'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  msgAlert = ({ heading, message, variant }) => {
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }

  render () {
    const { msgAlerts, user } = this.state
    // 1st: Write a route for the component that you want to do something
    // i.e. index your readings
    // 2nd: Create a folder & file with the name of the component as the title
    // 3rd: write a render and make sure it's hooked up
    // 4th:
    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
          />
        ))}
        <main>
          <Route exact path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route exact path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} exact path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/scs/:id' render={({ match }) => (
            <SingleCardSpread msgAlert={this.msgAlert} user={user} match={match}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/create-scs' render={() => (
            <CreateSingleCardSpread msgAlert={this.msgAlert} user={user}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/scs' render={() => (
            <SCSIndex msgAlert={this.msgAlert} user={user}/>
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
