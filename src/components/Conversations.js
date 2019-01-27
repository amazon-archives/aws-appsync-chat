import React from 'react'
import { css } from 'glamor'
import { observer } from 'mobx-react'
import { graphql, compose } from 'react-apollo'
import { FaComments, FaChevronRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import UserStore from '../mobx/UserStore'
import { primary, lightBg } from '../theme'
import { getUserAndConversations } from '../graphql'

const ConversationsObserver = observer(
  class Conversations extends React.Component {
    render() {
      const { username } = UserStore
      let { conversations } = this.props

      conversations = conversations.map((c) => {
        const convo = c.conversation.name.split('&')
        const name = convo.find(i => i !== username)
        return { ...c, name }
      })
      return (
        <div {...css(styles.container)}>
          <p {...css(styles.title)}>Conversations</p>
          {
            conversations.map((item, i) => (
              <Link to={`conversation/${item.conversation.id}/${item.name}`} {...css(styles.link)} key={i}>
                <div {...css(styles.conversation)}>
                  <FaComments />
                  <p {...css(styles.conversationTitle)}>{item.name}</p>
                  <div {...css(styles.chevronContainer)}>
                    <FaChevronRight />
                  </div>
                </div>
              </Link>
            ))
          }
        </div>
      )
    }
  }
)

const ConversationsWithData = compose(
  graphql(getUserAndConversations, {
    options: () => {
      return {
        variables: {
          id:  UserStore.username
        },
        fetchPolicy: 'cache-and-network'
      }
    },
    props: props => {
      return {
        conversations: props.data.getUser ? props.data.getUser.conversations.items : []
      }
    }
  })
)(ConversationsObserver)

const styles = {
  link: {
    textDecoration: 'none',
    color: 'black'
  },
  container: {
    padding: 10
  },
  conversation: {
    marginTop: 10,
    backgroundColor: lightBg,
    padding: '12px 15px',
    borderRadius: 20,
    display: 'flex'
  },
  conversationTitle: {
    margin: 0,
    marginLeft: 12
  },
  chevronContainer: {
    flex: 1, display: 'flex', justifyContent: 'flex-end'
  },
  title: {
    fontSize: 20,
    fontWeight: 500,
    margin: 0,
    borderBottom: `2px solid ${primary}`,
    paddingBottom: 4
  }
}

export default observer(ConversationsWithData)
