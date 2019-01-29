import React from 'react'
import { css } from 'glamor'
import { API, graphqlOperation } from 'aws-amplify'

import { primary } from '../theme'
import { createConvo, createConvoLink } from '../graphql'

class Overlay extends React.Component {
  state = { creatingConversation: false }
  createConversation = async () => {
    this.setState({ creatingConversation: true })
    try {
      const { username, user: { username: otherUserName }} = this.props
      const members = [username, otherUserName].sort()
      const conversationName = members.join(' and ')
      const convo = { name: conversationName, members }
      const conversation = await API.graphql(graphqlOperation(createConvo, convo))
      const { data: { createConvo: { id: convoLinkConversationId }}} = conversation
      this.props.history.push(`/conversation/${convoLinkConversationId}/${conversationName}`)
      const relation1 = { convoLinkUserId: username, convoLinkConversationId }
      const relation2 = { convoLinkUserId: otherUserName, convoLinkConversationId }
      await API.graphql(graphqlOperation(createConvoLink, relation1))
      await API.graphql(graphqlOperation(createConvoLink, relation2))
      this.props.history.push(`/conversation/${convoLinkConversationId}/${conversationName}`)
    } catch (err) {
      console.log('error creating conversation...', err)
    }
  }
  render() {
    const { user: { username } } = this.props
    return (
      <div {...css(styles.container)}>
        <div {...css(styles.content)}>
          <p {...css(styles.greetingTitle)}>New Conversation</p>
          <p {...css(styles.greeting)}>Create new conversation with {username}?</p>
          <div {...css(styles.divider)} />
          <div {...css(styles.button)} onClick={this.createConversation}>
            <p {...css(styles.buttonText)}>Yes</p>
          </div>
          <div {...css([styles.button, styles.cancel])} onClick={() => this.props.toggleOverlay(false)}>
            <p {...css([styles.buttonText])}>Cancel</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Overlay

const styles = {
  button: {
    backgroundColor: primary,
    padding: 15,
    margin: 10,
    marginTop: 0,
    cursor: 'pointer'
  },
  cancel: {
    backgroundColor: '#ededed'
  },
  divider: {
    width: 200,
    margin: '0 auto',
    height: 2,
    backgroundColor: 'rgba(0, 0, 0, .15)',
    marginBottom: 17,
    borderRadius: 10
  },
  buttonText: {
    margin: 0,
    textAlign: 'center',
    fontWeight: 700
  },
  greetingTitle: {
    fontSize: 24,
    textAlign: 'center',
    margin: 0,
    fontWeight: 500
  },
  greeting: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 5,
    color: 'rgba(0, 0, 0, .55)'
  },
  container: {
    position: 'absolute',
    borderRadius: 25,
    zIndex: 1000,
    left: 20,
    bottom: 180,
    top: 180,
    right: 20,
    backgroundColor: 'white',
    boxShadow: '0px 1px 3px rgba(0, 0, 0, .2)'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100vh - 360px)',
    flex: 1,
    justifyContent: 'center',
  }
}