import graphql from 'graphql-tag'
import gql from 'graphql-tag';

// mutations
const createUser = `
  mutation($username: String!) {
    createUser(input: {
      username: $username
    }) {
      id username createdAt
    }
  }
`

const createMessage = gql`mutation CreateMessage(
    $createdAt: String, $id: ID, $authorId: String, $content: String!, $messageConversationId: ID!
  ) {
  createMessage(input: {
    createdAt: $createdAt, id: $id, content: $content, messageConversationId: $messageConversationId, authorId: $authorId
  }) {
    id
    content
    authorId
    messageConversationId
    createdAt
  }
}
`;


const createConvo = `mutation CreateConvo($name: String!, $members: [String!]!) {
  createConvo(input: {
    name: $name, members: $members
  }) {
    id
    name
    members
  }
}
`;

const createConvoLink = `mutation CreateConvoLink(
    $convoLinkConversationId: ID!, $convoLinkUserId: ID
  ) {
  createConvoLink(input: {
    convoLinkConversationId: $convoLinkConversationId, convoLinkUserId: $convoLinkUserId
  }) {
    id
    convoLinkUserId
    convoLinkConversationId
    conversation {
      id
      name
    }
  }
}
`;

const getUser = graphql`
  query getUser($id: ID!) {
    getUser(id: $id) {
      id
      username
    }
  }
`

const getUserAndConversations = gql`
  query getUserAndConversations($id:ID!) {
    getUser(id:$id) {
      id
      username
      conversations(limit: 100) {
        items {
          id
          conversation {
            id
            name
          }
        }
      }
    }
  }
`

const getConvo = gql`
  query getConvo($id: ID!) {
    getConvo(id:$id) {
      id
      name
      members
      messages(limit: 100) {
        items {
          id
          content
          authorId
          messageConversationId
          createdAt
        }
      }
      createdAt
      updatedAt
    }
  }
`

const listUsers = graphql`
  query listUsers {
    listUsers {
      items {
        id
        username
        createdAt
      }
    }
  }
`

const onCreateMessage = gql`
  subscription onCreateMessage($messageConversationId: ID!) {
    onCreateMessage(messageConversationId: $messageConversationId) {
      id
      content
      authorId
      messageConversationId
      createdAt
    }
  }
`

const onCreateUser = gql`subscription OnCreateUser {
  onCreateUser {
    id
    username
    createdAt
  }
}
`;

export {
  createUser,
  createMessage,
  createConvo,
  createConvoLink,
  getConvo,
  getUser,
  getUserAndConversations,
  listUsers,
  onCreateMessage,
  onCreateUser
}
