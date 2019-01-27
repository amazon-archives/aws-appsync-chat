import React, { Component } from 'react';
import { withAuthenticator } from 'aws-amplify-react'
import { css } from 'glamor'
import { Hub } from 'aws-amplify'

import UserStore from './mobx/UserStore'

import Router from './Router'

class App extends Component {
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
      <div {...css(styles.container)}>
        <Router />
      </div>
    );
  }
}

const styles = {
  container: {
    padding: '55px 0px 50px'
  }
}

// export default withAuthenticator(App, { includeGreetings: true })
export default withAuthenticator(App)