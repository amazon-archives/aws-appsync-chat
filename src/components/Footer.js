import React from 'react'

import { css } from 'glamor'
import { Link, withRouter } from 'react-router-dom'

import { primary } from '../theme'

class Footer extends React.Component {
  render() {
    return (
      <div {...css(styles.footer)}>
        <Link
          to='/'
          {...css(styles.button)}
        >
          <p {...css(styles.buttonText)}>Convos</p>
        </Link>
        <Link
          to='/users'
          {...css(styles.button)}
        >
          <p {...css(styles.buttonText)}>Users</p>
        </Link>
        <Link
          to='/profile'
          {...css(styles.button)}
        >
          <p {...css(styles.buttonText)}>Profile</p>
        </Link>
      </div>
    )
  }
}

const styles = {
  footer: {
    height: 50,
    backgroundColor: primary,
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    display: 'flex'
  },
  button: {
    width: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textDecoration: 'none',
    color: 'black'
  },
  buttonText: {
    fontWeight: 500
  }
}

export default withRouter(Footer)