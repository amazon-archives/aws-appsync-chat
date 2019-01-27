import { API, graphqlOperation, Auth } from 'aws-amplify'
import { getUser as GetUser, createUser } from '../graphql'

import { observable, decorate } from 'mobx'

class User {
  username = ''
  userId = ''
  email = ''
  async init() {
    // set username
    console.log('init!')
    try {
      const user = await Auth.currentAuthenticatedUser()
      console.log('user:', user)
      this.username = user.username
      this.userId = user.signInUserSession.idToken.payload.sub
      this.email = user.signInUserSession.idToken.payload.email
    } catch (err) {
      console.log('error getting user data... ', err)
    }
    // check if user exists in db, if not then create user
    try {
      await Auth.currentAuthenticatedUser()
      this.checkIfUserExists(this.userId)
    } catch (err) {
      console.log('error:' , err)
    }
  }

  async checkIfUserExists(id) {
    console.log('id:', id)
    try {
      const user = await API.graphql(graphqlOperation(GetUser, {id: id}))
      console.log('user:', user)
      const { getUser } = user.data
      if (!getUser) {
        this.createUser()
      } else {
        console.log('me:', getUser)
      }
    } catch (err) {
      console.log('error fetching user: ', err)
    }
  }

  async createUser() {
    try {
      await API.graphql(graphqlOperation(createUser, { username: this.username }))
    } catch (err) {
      console.log('error signing up user', err)
    }
  }
}

decorate(User, {
  userId: observable,
  username: observable,
  email: observable
});

export default new User()
