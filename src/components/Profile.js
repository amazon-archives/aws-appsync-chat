import React from 'react'

import { css } from 'glamor'
import { Auth } from 'aws-amplify'
import { observer } from 'mobx-react'

import UserStore from '../mobx/UserStore'
import { primary } from '../theme'

const ProfileWithData = observer(class Profile extends React.Component {
  signOut = async () => {
    try {
      await Auth.signOut()
    } catch (err) {
      console.log('error signing out')
    }
  }
  render() {
    const { username, email } = UserStore
    return (
      <div {...css(styles.container)}>
        <p {...css(styles.title)}>Profile</p>
        <p>Username: <b>{username}</b></p>
        <p>Email: <b>{email}</b></p>
        <div {...css(styles.button)}>
          <p {...css(styles.buttonText)} onClick={this.signOut}>Sign Out</p>
        </div>
      </div>
    )
  }
})

const styles = {
  button: {
    margin: '100px 0px 0px',
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ededed',
    cursor: 'pointer'
  },
  buttonText: {
    fontWeight: 500
  },
  container: {
    padding: 10
  },
  title: {
    fontSize: 20,
    fontWeight: 500,
    margin: 0,
    borderBottom: `2px solid ${primary}`,
    paddingBottom: 4
  }
}

export default ProfileWithData
