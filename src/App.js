import React, { Component } from 'react';
import { css } from 'glamor'

import Router from './Router'

class App extends Component {
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

export default App