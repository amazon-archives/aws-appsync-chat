import React from 'react'
import { BrowserRouter } from "react-router-dom"
import { Hub } from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react'

import UserStore from './mobx/UserStore'
import Header from './components/Header'
import Routes from './Routes'
import { primary } from './theme'

class Router extends React.Component {
  state = {
    view: 'convos'
  }
  componentDidMount() {
    UserStore.init()
    Hub.listen('auth', this);
  }
  onHubCapsule = (data) => {
    const { channel } = data;
    if (channel === 'auth') {
      this.props.onStateChange()
    }
  }
  toggleDisplay = (view) => {
    this.setState(() => ({
      view
    }))
  }
  render() {
    return (
      <Routes />
    )
  }
}

const routeConfig = {
  theme: {
    button: {
      backgroundColor: primary,
      color: 'black'
    },
    a: {
      color: 'black'
    }
  }
}

const RouterWithAuth = withAuthenticator(Router, routeConfig)

const AppRouter = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <RouterWithAuth />
      </div>
    </BrowserRouter>
  )
}

export default AppRouter