import React from 'react'
import { graphql, compose } from 'react-apollo'
import { css } from 'glamor'
import { FaUser, FaPlus } from 'react-icons/fa'

import { observer } from 'mobx-react'
import { primary } from '../theme'
import { listUsers } from '../graphql'
import Overlay from './Overlay'
import UserStore from '../mobx/UserStore'

class Users extends React.Component {
  state = { showOverlay: false, userForConvo: {} }
  toggleOverlay = (visible, userForConvo) => {
    this.setState({ showOverlay: visible, userForConvo })
  }
  render() {
    const { username, userId } = UserStore
    console.log('props from Users:', this.props)
    const users = this.props.users.filter(u => u.username !== username)
    return (
      <div {...css(styles.container)}>
        {
          this.state.showOverlay && (
            <Overlay
              user={this.state.userForConvo}
              toggleOverlay={this.toggleOverlay}
              userId={userId}
              username={username}
              history={this.props.history}
            />
          )
        }
        <p {...css(styles.title)}>Users</p>
        {
         users.map((u, i) => (
            <div
              key={i} {...css(styles.user)}
              onClick={() => this.toggleOverlay(true, u)}
            >
              <FaUser />
              <p {...css(styles.username)}>{u.username}</p>
              <div {...css(styles.plusIconContainer)}>
                <FaPlus />
              </div>
            </div>
          ))
        }
      </div>
    )
  }
}

const styles = {
  plusIconContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-end'
  },
  username: {
    margin: 0,
    marginLeft: 10,
  },
  user: {
    display: 'flex',
    padding: 15,
    backgroundColor: '#ededed',
    borderRadius: 20,
    marginTop: 10,
    cursor: 'pointer'
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

const UsersWithData = compose(
  graphql(listUsers, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: props => {
      console.log('props:', props)
      return {
        users: props.data.listUsers ? props.data.listUsers.items : []
      }
    }
  })
)(Users)

export default observer(UsersWithData)
