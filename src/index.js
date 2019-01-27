import React from 'react'
import ReactDOM from 'react-dom'
import AWSAppSyncClient from 'aws-appsync'
import { Rehydrated } from 'aws-appsync-react'
import { ApolloProvider } from 'react-apollo'
import { Auth } from 'aws-amplify'
import Amplify from 'aws-amplify'

import config from './aws-exports'
import './index.css'
import App from './App'
import Loading from './components/Loading'

Amplify.configure(config)

const client = new AWSAppSyncClient({
  url: config.aws_appsync_graphqlEndpoint,
  region: config.aws_appsync_region,
  auth: {
    type: config.aws_appsync_authenticationType,
    jwtToken: async () => (await Auth.currentSession()).idToken.jwtToken
  }
});

const AppWithProvider = () => (
  <ApolloProvider client={client}>
    <Rehydrated
      render={({ rehydrated }) => (
        rehydrated ? <App /> : <Loading />
      )}
    />
  </ApolloProvider>
);

ReactDOM.render(<AppWithProvider />, document.getElementById('root'));
