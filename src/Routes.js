import React from 'react'
import { Switch, Route } from "react-router-dom"

import Conversations from './components/Conversations'
import Conversation from './components/Conversation'
import Users from './components/Users'
import Profile from './components/Profile'
import Footer from './components/Footer'

const Routes = () => (
  <div>
    <Switch>
      <Route path="/" exact component={Conversations} />
      <Route path="/users/" component={Users} />
      <Route path="/profile/" component={Profile} />
      <Route path="/conversation/:conversationId/:conversationName" component={Conversation} />
      <Route component={() => <p>404 no route found</p>} />
    </Switch>
    <Footer />
  </div>
)

export default Routes