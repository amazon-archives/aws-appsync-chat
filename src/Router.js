import React from 'react'

import Conversations from './components/Conversations'
import Conversation from './components/Conversation'
import Users from './components/Users'
import Profile from './components/Profile'
import Header from './components/Header'
import Footer from './components/Footer'

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const AppRouter = () => {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path="/" exact component={Conversations} />
          <Route path="/users/" component={Users} />
          <Route path="/profile/" component={Profile} />
          <Route path="/conversation/:conversationId/:conversationName" component={Conversation} />
          <Route component={() => <p>404 no route found</p>} />
        </Switch>
        <Footer />
      </div>
    </Router>
  )
}

export default AppRouter