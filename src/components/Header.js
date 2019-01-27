import React from 'react'
import { css } from 'glamor'
import { Link } from 'react-router-dom'

import { primary } from '../theme'

const chatLogo = require('../assets/chattlogo.png')

class Header extends React.Component {
  render() {
    return (
      <div {...css(styles.container)}>
        <Link to='/'>
          <img
            alt='Logo'
            {...css(styles.logo)}
            src={chatLogo}
          />
        </Link>
      </div>
    )
  }
}

const styles = {
  container: {
    height: 55,
    backgroundColor: primary,
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%'
  },
  logo: {
    height: 34,
    paddingLeft: 10
  }
}

export default Header